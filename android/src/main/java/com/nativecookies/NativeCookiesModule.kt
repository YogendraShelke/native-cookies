package com.nativecookies

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class NativeCookiesModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private val cookieHeader = "Cookie"
  private val versionZeroHeader = "Set-cookie"
  private val expiresField = "=; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  private val domainField = "; Domain="
  private val pathField = "; Path="

  private var mCookieHandler: ForwardingCookieHandler? = null

  init {
    mCookieHandler = ForwardingCookieHandler(reactContext)
  }

  override fun getName(): String {
    return "NativeCookies"
  }

  @ReactMethod
  @Throws(URISyntaxException::class, IOException::class)
  fun setCookie(url: String?, value: String?, promise: Promise) {
    if (url != null) {
      if (value != null) {
        setCookie(url, value)
      }
    }
    promise.resolve(null)
  }

  @ReactMethod
  @Throws(URISyntaxException::class, IOException::class)
  fun getCookie(url: String, promise: Promise) {
    val cookieList = getCookie(url)
    promise.resolve(cookieList?.get(0))
  }

  @ReactMethod
  @Throws(URISyntaxException::class, IOException::class)
  fun clearCookie(url: String?, promise: Promise) {
    if (url == null) {
      mCookieHandler?.clearCookies { promise.resolve(null) }
    } else {
      val cookieList = getCookie(url)
      val uri = URI(url)
      val domainURI: String = uri.scheme.toString() + "://" + uri.host + if (uri.port == -1) "" else ":" + uri.port
      if (cookieList != null) {
        val cookies: Array<String> = cookieList[0].split(";").toTypedArray()

        // Expires each cookie with every possible domain and path option
        for (cookie in cookies) {
          val parts: Array<String> = cookie.split("=").toTypedArray()
          var path = ""
          var subPaths: List<String> = uri.path.split("/")
          val name: String = parts[0].trim { it <= ' ' }
          val base = name + expiresField
          setCookie(domainURI, base)
          if (subPaths.isEmpty()) {
            subPaths = arrayOf("").toList()
          }
          for (subPath in subPaths) {
            path += "/$subPath"
            val domains: List<String> = uri.host.split("\\.")
            var domain = domains[domains.size - 1]
            for (i in domains.size - 1 downTo 1) {
              domain = domains[i - 1] + "." + domain
              setCookie(domainURI, "$base$domainField.$domain$pathField$path")
              setCookie(domainURI, "$base$domainField.$domain$pathField$path")
            }
            setCookie(domainURI, base + domainField + domain + pathField + path)
            if (path == "/") {
              path = ""
            }
          }
        }
      }
      promise.resolve(null)
    }
  }

  @Nullable
  @Throws(URISyntaxException::class, IOException::class)
  private fun getCookie(url: String): List<String>? {
    val uri = URI(url)
    val cookieMap: MutableMap<String, MutableList<String>>? = mCookieHandler?.get(uri, HashMap<String, List<String>>())
    return cookieMap?.get(cookieHeader)
  }

  @Throws(URISyntaxException::class, IOException::class)
  private fun setCookie(url: String, value: String) {
    val uri = URI(url)
    val cookieMap: MutableMap<String, List<String>> = HashMap<String, List<String>>()
    cookieMap[versionZeroHeader] = Collections.singletonList(value)
    mCookieHandler?.put(uri, cookieMap)
  }

}
