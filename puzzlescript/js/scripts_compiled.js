/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
if ("function" != typeof Blob || void 0 === URL)
	if ("function" == typeof Blob && "undefined" != typeof webkitURL) var URL = webkitURL;
	else var Blob = function(e) {
		"use strict";
		var n = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder || function(e) {
			var n = function(e) {
					return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1]
				},
				t = function() {
					this.data = []
				},
				r = function(e, n, t) {
					this.data = e, this.size = e.length, this.type = n, this.encoding = t
				},
				i = t.prototype,
				o = r.prototype,
				a = e.FileReaderSync,
				l = function(e) {
					this.code = this[this.name = e]
				},
				s = "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),
				c = s.length,
				u = e.URL || e.webkitURL || e,
				d = u.createObjectURL,
				h = u.revokeObjectURL,
				f = u,
				p = e.btoa,
				g = e.atob,
				m = !1,
				v = e.ArrayBuffer,
				y = e.Uint8Array;
			for (r.fake = o.fake = !0; c--;) l.prototype[s[c]] = c + 1;
			try {
				y && function(e) {
					m = !e
				}.apply(0, new y(1))
			} catch (e) {}
			return u.createObjectURL || (f = e.URL = {}), f.createObjectURL = function(e) {
				var n, t = e.type;
				return null === t && (t = "application/octet-stream"), e instanceof r ? (n = "data:" + t, "base64" === e.encoding ? n + ";base64," + e.data : "URI" === e.encoding ? n + "," + decodeURIComponent(e.data) : p ? n + ";base64," + p(e.data) : n + "," + encodeURIComponent(e.data)) : d ? d.call(u, e) : void 0
			}, f.revokeObjectURL = function(e) {
				"data:" !== e.substring(0, 5) && h && h.call(u, e)
			}, i.append = function(e) {
				var t = this.data;
				if (y && (e instanceof v || e instanceof y))
					if (m) t.push(String.fromCharCode.apply(String, new y(e)));
					else
						for (var i = new y(e), o = 0, s = i.length; o < s; o++) String.fromCharCode(i[o]);
				else if ("Blob" === n(e) || "File" === n(e)) {
					if (!a) throw new l("NOT_READABLE_ERR");
					var c = new a;
					t.push(c.readAsBinaryString(e))
				} else e instanceof r ? "base64" === e.encoding && g ? t.push(g(e.data)) : "URI" === e.encoding ? t.push(decodeURIComponent(e.data)) : "raw" === e.encoding && t.push(e.data) : ("string" != typeof e && (e += ""), t.push(unescape(encodeURIComponent(e))))
			}, i.getBlob = function(e) {
				return arguments.length || (e = null), new r(this.data.join(""), e, "raw")
			}, i.toString = function() {
				return "[object BlobBuilder]"
			}, o.slice = function(e, n, t) {
				var i = arguments.length;
				return i < 3 && (t = null), new r(this.data.slice(e, i > 1 ? n : this.data.length), t, this.encoding)
			}, o.toString = function() {
				return "[object Blob]"
			}, t
		}(e);
		return function(e, t) {
			var r = t && t.type || "",
				i = new n;
			if (e)
				for (var o = 0, a = e.length; o < a; o++) i.append(e[o]);
			return i.getBlob(r)
		}
	}(self);
/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */
! function(e) {
	"use strict";
	var n, t = e.Uint8Array,
		r = e.HTMLCanvasElement,
		i = /\s*;\s*base64\s*(?:;|$)/i,
		o = function(e) {
			for (var r, i, o = e.length, a = new t(o / 4 * 3 | 0), l = 0, s = 0, c = [0, 0], u = 0, d = 0; o--;) i = e.charCodeAt(l++), 255 !== (r = n[i - 43]) && undefined !== r && (c[1] = c[0], c[0] = i, d = d << 6 | r, 4 === ++u && (a[s++] = d >>> 16, 61 !== c[1] && (a[s++] = d >>> 8), 61 !== c[0] && (a[s++] = d), u = 0));
			return a.buffer
		};
	t && (n = new t([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51])), r && !r.prototype.toBlob && (r.prototype.toBlob = function(e, n) {
		if (n || (n = "image/png"), this.mozGetAsFile) e(this.mozGetAsFile("canvas", n));
		else {
			var r, a = Array.prototype.slice.call(arguments, 1),
				l = this.toDataURL.apply(this, a),
				s = l.indexOf(","),
				c = l.substring(s + 1),
				u = i.test(l.substring(0, s));
			Blob.fake ? ((r = new Blob).encoding = u ? "base64" : "URI", r.data = c, r.size = c.length) : t && (r = new Blob(u ? [o(c)] : [decodeURIComponent(c)], {
				type: n
			})), e(r)
		}
	})
}(self);
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs || navigator.msSaveBlob && navigator.msSaveBlob.bind(navigator) || function(e) {
	"use strict";
	var n = e.document,
		t = e.URL || e.webkitURL || e,
		r = n.createElementNS("http://www.w3.org/1999/xhtml", "a"),
		i = "download" in r,
		o = e.webkitRequestFileSystem,
		a = e.requestFileSystem || o || e.mozRequestFileSystem,
		l = function(n) {
			(e.setImmediate || e.setTimeout)((function() {
				throw n
			}), 0)
		},
		s = "application/octet-stream",
		c = 0,
		u = [],
		d = function(e, n, t) {
			for (var r = (n = [].concat(n)).length; r--;) {
				var i = e["on" + n[r]];
				if ("function" == typeof i) try {
					i.call(e, t || e)
				} catch (e) {
					l(e)
				}
			}
		},
		h = function(t, l) {
			var h, f, p, g, m, v = this,
				y = t.type,
				b = !1,
				w = function() {
					var n = (e.URL || e.webkitURL || e).createObjectURL(t);
					return u.push(n), n
				},
				_ = function() {
					d(v, "writestart progress write writeend".split(" "))
				},
				C = function() {
					!b && h || (h = w()), f && (f.location.href = h), v.readyState = v.DONE, _()
				},
				k = function(e) {
					return function() {
						if (v.readyState !== v.DONE) return e.apply(this, arguments)
					}
				},
				x = {
					create: !0,
					exclusive: !1
				};
			if (v.readyState = v.INIT, l || (l = "download"), i) return h = w(), r.href = h, r.download = l, g = r, (m = n.createEvent("MouseEvents")).initMouseEvent("click", !0, !1, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), g.dispatchEvent(m), v.readyState = v.DONE, void _();
			e.chrome && y && y !== s && (p = t.slice || t.webkitSlice, t = p.call(t, 0, t.size, s), b = !0), o && "download" !== l && (l += ".download"), f = y === s || o ? e : e.open(), a ? (c += t.size, a(e.TEMPORARY, c, k((function(e) {
				e.root.getDirectory("saved", x, k((function(e) {
					var n = function() {
						e.getFile(l, x, k((function(e) {
							e.createWriter(k((function(n) {
								n.onwriteend = function(n) {
									f.location.href = e.toURL(), u.push(e), v.readyState = v.DONE, d(v, "writeend", n)
								}, n.onerror = function() {
									var e = n.error;
									e.code !== e.ABORT_ERR && C()
								}, "writestart progress write abort".split(" ").forEach((function(e) {
									n["on" + e] = v["on" + e]
								})), n.write(t), v.abort = function() {
									n.abort(), v.readyState = v.DONE
								}, v.readyState = v.WRITING
							})), C)
						})), C)
					};
					e.getFile(l, {
						create: !1
					}, k((function(e) {
						e.remove(), n()
					})), k((function(e) {
						e.code === e.NOT_FOUND_ERR ? n() : C()
					})))
				})), C)
			})), C)) : C()
		},
		f = h.prototype;
	return f.abort = function() {
			var e = this;
			e.readyState = e.DONE, d(e, "abort")
		}, f.readyState = f.INIT = 0, f.WRITING = 1, f.DONE = 2, f.error = f.onwritestart = f.onprogress = f.onwrite = f.onabort = f.onerror = f.onwriteend = null, e.addEventListener("unload", (function() {
			for (var e = u.length; e--;) {
				var n = u[e];
				"string" == typeof n ? t.revokeObjectURL(n) : n.remove()
			}
			u.length = 0
		}), !1),
		function(e, n) {
			return new h(e, n)
		}
}(self);

function storage_has(e) {
	return null !== localStorage.getItem(e)
}

function storage_get(e) {
	return localStorage.getItem(e)
}

function storage_set(e, n) {
	return localStorage.setItem(e, n)
}

function storage_remove(e) {
	localStorage.removeItem(e)
}
LZWEncoder = function() {
	var e, n, t, r, i, o, a, l, s, c, u, d, h = {},
		f = new Array,
		p = new Array,
		g = 5003,
		m = 0,
		v = !1,
		y = 0,
		b = 0,
		w = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535],
		_ = [],
		C = h.LZWEncoder = function(i, o, a, l) {
			e = i, n = o, t = a, r = Math.max(2, l)
		},
		k = function(e, n) {
			_[d++] = e, d >= 254 && E(n)
		},
		x = function(e) {
			S(g), m = c + 2, v = !0, L(c, e)
		},
		S = function(e) {
			for (var n = 0; n < e; ++n) f[n] = -1
		},
		M = h.compress = function(e, n) {
			var t, r, i, o, h, y, b;
			for (v = !1, l = R(a = s = e), u = (c = 1 << e - 1) + 1, m = c + 2, d = 0, o = T(), b = 0, t = g; t < 65536; t *= 2) ++b;
			b = 8 - b, S(y = g), L(c, n);
			e: for (; - 1 != (i = T());)
				if (t = (i << 12) + o, f[r = i << b ^ o] != t) {
					if (f[r] >= 0) {
						h = y - r, 0 == r && (h = 1);
						do {
							if ((r -= h) < 0 && (r += y), f[r] == t) {
								o = p[r];
								continue e
							}
						} while (f[r] >= 0)
					}
					L(o, n), o = i, m < 4096 ? (p[r] = m++, f[r] = t) : x(n)
				} else o = p[r];
			L(o, n), L(u, n)
		},
		E = (h.encode = function(t) {
			t.writeByte(r), i = e * n, o = 0, M(r + 1, t), t.writeByte(0)
		}, function(e) {
			d > 0 && (e.writeByte(d), e.writeBytes(_, 0, d), d = 0)
		}),
		R = function(e) {
			return (1 << e) - 1
		},
		T = function() {
			return 0 == i ? -1 : (--i, 255 & t[o++])
		},
		L = function(e, n) {
			for (y &= w[b], b > 0 ? y |= e << b : y = e, b += a; b >= 8;) k(255 & y, n), y >>= 8, b -= 8;
			if ((m > l || v) && (v ? (l = R(a = s), v = !1) : (++a, l = 12 == a ? 4096 : R(a))), e == u) {
				for (; b > 0;) k(255 & y, n), y >>= 8, b -= 8;
				E(n)
			}
		};
	return C.apply(this, arguments), h
}, NeuQuant = function() {
	var e, n, t, r, i, o = {},
		a = 256,
		l = 1024,
		s = 1 << 18,
		c = new Array,
		u = new Array,
		d = new Array,
		h = new Array,
		f = o.NeuQuant = function(e, o, l) {
			var s, c;
			for (n = e, t = o, r = l, i = new Array(a), s = 0; s < a; s++) i[s] = new Array(4), (c = i[s])[0] = c[1] = c[2] = (s << 12) / a, d[s] = 256, u[s] = 0
		},
		p = (o.map = function(e, n, t) {
			var r, o, l, s, u, d, h;
			for (u = 1e3, h = -1, o = (r = c[n]) - 1; r < a || o >= 0;) r < a && ((l = (d = i[r])[1] - n) >= u ? r = a : (r++, l < 0 && (l = -l), (s = d[0] - e) < 0 && (s = -s), (l += s) < u && ((s = d[2] - t) < 0 && (s = -s), (l += s) < u && (u = l, h = d[3])))), o >= 0 && ((l = n - (d = i[o])[1]) >= u ? o = -1 : (o--, l < 0 && (l = -l), (s = d[0] - e) < 0 && (s = -s), (l += s) < u && ((s = d[2] - t) < 0 && (s = -s), (l += s) < u && (u = l, h = d[3]))));
			return h
		}, o.process = function() {
			return function() {
					var i, o, a, s, c, u, d, f, p, y, b, w, _, C;
					for (t < 1509 && (r = 1), e = 30 + (r - 1) / 3, w = n, _ = 0, C = t, y = (b = t / (3 * r)) / 100 | 0, f = l, (d = (u = 2048) >> 6) <= 1 && (d = 0), i = 0; i < d; i++) h[i] = f * (256 * (d * d - i * i) / (d * d));
					for (p = t < 1509 ? 3 : t % 499 != 0 ? 1497 : t % 491 != 0 ? 1473 : t % 487 != 0 ? 1461 : 1509, i = 0; i < b;)
						if (a = (255 & w[_ + 0]) << 4, s = (255 & w[_ + 1]) << 4, c = (255 & w[_ + 2]) << 4, o = v(a, s, c), m(f, o, a, s, c), 0 != d && g(d, o, a, s, c), (_ += p) >= C && (_ -= t), 0 == y && (y = 1), ++i % y == 0)
							for (f -= f / e, (d = (u -= u / 30) >> 6) <= 1 && (d = 0), o = 0; o < d; o++) h[o] = f * (256 * (d * d - o * o) / (d * d))
				}(), p(),
				function() {
					var e, n, t, r, o, l, s, u;
					for (s = 0, u = 0, e = 0; e < a; e++) {
						for (t = e, r = (o = i[e])[1], n = e + 1; n < a; n++)(l = i[n])[1] < r && (t = n, r = l[1]);
						if (l = i[t], e != t && (n = l[0], l[0] = o[0], o[0] = n, n = l[1], l[1] = o[1], o[1] = n, n = l[2], l[2] = o[2], o[2] = n, n = l[3], l[3] = o[3], o[3] = n), r != s) {
							for (c[s] = u + e >> 1, n = s + 1; n < r; n++) c[n] = e;
							s = r, u = e
						}
					}
					for (c[s] = u + 255 >> 1, n = s + 1; n < 256; n++) c[n] = 255
				}(),
				function() {
					for (var e = [], n = new Array(a), t = 0; t < a; t++) n[i[t][3]] = t;
					for (var r = 0, o = 0; o < a; o++) {
						var l = n[o];
						e[r++] = i[l][0], e[r++] = i[l][1], e[r++] = i[l][2]
					}
					return e
				}()
		}, function() {
			var e;
			for (e = 0; e < a; e++) i[e][0] >>= 4, i[e][1] >>= 4, i[e][2] >>= 4, i[e][3] = e
		}),
		g = function(e, n, t, r, o) {
			var l, c, u, d, f, p, g;
			for ((u = n - e) < -1 && (u = -1), (d = n + e) > a && (d = a), l = n + 1, c = n - 1, p = 1; l < d || c > u;) {
				if (f = h[p++], l < d) {
					g = i[l++];
					try {
						g[0] -= f * (g[0] - t) / s, g[1] -= f * (g[1] - r) / s, g[2] -= f * (g[2] - o) / s
					} catch (e) {}
				}
				if (c > u) {
					g = i[c--];
					try {
						g[0] -= f * (g[0] - t) / s, g[1] -= f * (g[1] - r) / s, g[2] -= f * (g[2] - o) / s
					} catch (e) {}
				}
			}
		},
		m = function(e, n, t, r, o) {
			var a = i[n];
			a[0] -= e * (a[0] - t) / l, a[1] -= e * (a[1] - r) / l, a[2] -= e * (a[2] - o) / l
		},
		v = function(e, n, t) {
			var r, o, l, s, c, h, f, p, g, m;
			for (g = p = ~(1 << 31), f = h = -1, r = 0; r < a; r++)(o = (m = i[r])[0] - e) < 0 && (o = -o), (l = m[1] - n) < 0 && (l = -l), o += l, (l = m[2] - t) < 0 && (l = -l), (o += l) < p && (p = o, h = r), (s = o - (u[r] >> 12)) < g && (g = s, f = r), c = d[r] >> 10, d[r] -= c, u[r] += c << 10;
			return d[h] += 64, u[h] -= 65536, f
		};
	return f.apply(this, arguments), o
}, GIFEncoder = function() {
	for (var e = 0, n = {}; e < 256; e++) n[e] = String.fromCharCode(e);

	function t() {
		this.bin = []
	}
	t.prototype.getData = function() {
		for (var e = "", t = this.bin.length, r = 0; r < t; r++) e += n[this.bin[r]];
		return e
	}, t.prototype.writeByte = function(e) {
		this.bin.push(e)
	}, t.prototype.writeUTFBytes = function(e) {
		for (var n = e.length, t = 0; t < n; t++) this.writeByte(e.charCodeAt(t))
	}, t.prototype.writeBytes = function(e, n, t) {
		for (var r = t || e.length, i = n || 0; i < r; i++) this.writeByte(e[i])
	};
	var r, i, o, a, l, s, c, u, d, h = {},
		f = null,
		p = -1,
		g = 0,
		m = !1,
		v = new Array,
		y = 7,
		b = -1,
		w = !0,
		_ = !1,
		C = 10,
		k = (h.setDelay = function(e) {
			g = Math.round(e / 10)
		}, h.setDispose = function(e) {
			e >= 0 && (b = e)
		}, h.setRepeat = function(e) {
			e >= 0 && (p = e)
		}, h.setTransparent = function(e) {
			f = e
		}, h.addFrame = function(e, n) {
			if (null == e || !m || null == a) throw new Error("Please call start method before calling addFrame");
			var t = !0;
			try {
				n ? l = e : (l = e.getImageData(0, 0, e.canvas.width, e.canvas.height).data, _ || x(e.canvas.width, e.canvas.height)), E(), S(), w && (L(), O(), p >= 0 && I()), R(), T(), w || O(), D(), w = !1
			} catch (e) {
				t = !1
			}
			return t
		}, h.finish = function() {
			if (!m) return !1;
			var e = !0;
			m = !1;
			try {
				a.writeByte(59)
			} catch (n) {
				e = !1
			}
			return e
		}, function() {
			o = 0, l = null, s = null, c = null, d = null, !1, w = !0
		}),
		x = (h.setFrameRate = function(e) {
			15 != e && (g = Math.round(100 / e))
		}, h.setQuality = function(e) {
			e < 1 && (e = 1), C = e
		}, h.setSize = function(e, n) {
			m && !w || ((r = e) < 1 && (r = 320), (i = n) < 1 && (i = 240), _ = !0)
		}),
		S = (h.start = function() {
			k();
			var e = !0;
			!1, a = new t;
			try {
				a.writeUTFBytes("GIF89a")
			} catch (n) {
				e = !1
			}
			return m = e
		}, h.cont = function() {
			k();
			return !1, a = new t, m = !0
		}, function() {
			var e = s.length,
				n = e / 3;
			c = [];
			for (var t = new Set, r = 0, i = 0; i < n && (t.add(((255 & s[r++]) << 16) + ((255 & s[r++]) << 8) + (255 & s[r++])), !(t.length > 256)); i++);
			if (t.length > 256) {
				y = 7;
				var a = new NeuQuant(s, e, C);
				d = a.process(), r = 0;
				for (i = 0; i < n; i++) {
					var l = a.map(255 & s[r++], 255 & s[r++], 255 & s[r++]);
					v[l] = !0, c[i] = l
				}
			} else {
				d = Array.from(t), r = 0;
				for (i = 0; i < n; i++) {
					l = d.indexOf(((255 & s[r++]) << 16) + ((255 & s[r++]) << 8) + (255 & s[r++]));
					v[l] = !0, c[i] = l
				}
				d = d.reduce((function(e, n, t, r) {
					return e.concat(n >>> 16, n >>> 8 & 255, 255 & n)
				}), []), -1 === (y = Math.ceil(Math.log2(d.length / 3)) - 1) && (y = 0)
			}
			s = null, u = 8, null != f && (o = M(f))
		}),
		M = function(e) {
			if (null == d) return -1;
			for (var n = (16711680 & e) >> 16, t = (65280 & e) >> 8, r = 255 & e, i = 0, o = 16777216, a = d.length, l = 0; l < a;) {
				var s = n - (255 & d[l++]),
					c = t - (255 & d[l++]),
					u = r - (255 & d[l]),
					h = s * s + c * c + u * u,
					f = l / 3;
				v[f] && h < o && (o = h, i = f), l++
			}
			return i
		},
		E = function() {
			var e = r,
				n = i;
			s = [];
			for (var t = l, o = 0, a = 0; a < n; a++)
				for (var c = 0; c < e; c++) {
					var u = a * e * 4 + 4 * c;
					s[o++] = t[u], s[o++] = t[u + 1], s[o++] = t[u + 2]
				}
		},
		R = function() {
			var e, n;
			a.writeByte(33), a.writeByte(249), a.writeByte(4), null == f ? (e = 0, n = 0) : (e = 1, n = 2), b >= 0 && (n = 7 & b), n <<= 2, a.writeByte(0 | n | e), A(g), a.writeByte(o), a.writeByte(0)
		},
		T = function() {
			a.writeByte(44), A(0), A(0), A(r), A(i), w ? a.writeByte(0) : a.writeByte(128 | y)
		},
		L = function() {
			A(r), A(i), a.writeByte(240 | y), a.writeByte(0), a.writeByte(0)
		},
		I = function() {
			a.writeByte(33), a.writeByte(255), a.writeByte(11), a.writeUTFBytes("NETSCAPE2.0"), a.writeByte(3), a.writeByte(1), A(p), a.writeByte(0)
		},
		O = function() {
			a.writeBytes(d);
			for (var e = 3 * Math.pow(2, y + 1) - d.length, n = 0; n < e; n++) a.writeByte(0)
		},
		A = function(e) {
			a.writeByte(255 & e), a.writeByte(e >> 8 & 255)
		},
		D = function() {
			new LZWEncoder(r, i, c, u).encode(a)
		};
	h.stream = function() {
		return a
	}, h.setProperties = function(e, n) {
		m = e, w = n
	};
	return h
};
var compiledText, canSetHTMLColors = !1,
	canDump = !0,
	recordingStartsFromLevel = 0,
	inputHistory = [],
	soundHistory = [],
	canOpenEditor = !0,
	IDE = !0,
	debugger_turnIndex = 0,
	debug_visualisation_array = [],
	diffToVisualize = null;

function convertLevelToString() {
	for (var e = "", n = {}, t = 0, r = 0; r < level.height; r++) {
		for (var i = 0; i < level.width; i++) {
			for (var o = level.getCell(i + r * level.width), a = [], l = 0; l < 32 * STRIDE_OBJ; ++l) o.get(l) && a.push(state.idDict[l]);
			a.sort(), a = a.join(" "), n.hasOwnProperty(a) || (n[a] = t++, e += a + ":"), e += n[a] + ","
		}
		e += "\n"
	}
	return e
}

function stripHTMLTags(e) {
	var n = document.createElement("div");
	return n.innerHTML = e, (n.textContent || n.innerText || "").trim()
}

function dumpTestCase() {
	var e = [r = compiledText, errorStrings.map(stripHTMLTags), errorCount],
		n = JSON.stringify(e);
	if (n = `<br>\n\t[<br>\n\t\t"${state.metadata.title||"untitled test"}",<br>\n\t\t${n}<br>\n\t],`, consolePrint('<br>Compilation error/warning data (for error message tests - errormessage_testdata.js):<br><br><br><span id="' + (t = "selectable" + ++selectableint) + '" onclick="selectText(\'' + t + "',event)\">" + n + "</span><br><br><br>", !0), !titleScreen) {
		var t, r = compiledText,
			i = inputHistory.concat([]),
			o = soundHistory.concat([]);
		e = [r, i, convertLevelToString(), recordingStartsFromLevel, loadedLevelSeed, o], n = JSON.stringify(e);
		n = `<br>\n\t\t[<br>\n\t\t\t"${state.metadata.title||"untitled test"}",<br>\n\t\t\t${n}<br>\n\t\t],`, consolePrint('<br>Recorded play session data (for play session tests - testdata.js):<br><br><br><span id="' + (t = "selectable" + ++selectableint) + '" onclick="selectText(\'' + t + "',event)\">" + n + "</span><br><br><br>", !0)
	}
}

function clearInputHistory() {
	!0 === canDump && (inputHistory = [], soundHistory = [], recordingStartsFromLevel = curlevel)
}

function pushInput(e) {
	!0 === canDump && inputHistory.push(e)
}

function pushSoundToHistory(e) {
	!0 === canDump && soundHistory.push(e)
}
var unitTesting = !1,
	curlevel = 0,
	curlevelTarget = null,
	hasUsedCheckpoint = !1,
	levelEditorOpened = !1,
	muted = 0,
	runrulesonlevelstart_phase = !1,
	ignoreNotJustPressedAction = !0;

function doSetupTitleScreenLevelContinue() {
	try {
		if (storage_has(document.URL)) {
			if (storage_has(document.URL + "_checkpoint")) {
				var e = storage_get(document.URL + "_checkpoint");
				curlevelTarget = JSON.parse(e);
				var n = [];
				for (var t in Object.keys(curlevelTarget.dat)) n[t] = curlevelTarget.dat[t];
				curlevelTarget.dat = new Int32Array(n)
			}
			curlevel = storage_get(document.URL)
		}
	} catch (e) {}
}
doSetupTitleScreenLevelContinue();
var verbose_logging = !1,
	throttle_movement = !1,
	cache_console_messages = !1,
	quittingTitleScreen = !1,
	quittingMessageScreen = !1,
	deltatime = 17,
	timer = 0,
	repeatinterval = 150,
	autotick = 0,
	autotickinterval = 0,
	winning = !1,
	againing = !1,
	againinterval = 150,
	norepeat_action = !1,
	oldflickscreendat = [],
	keybuffer = [],
	restarting = !1,
	messageselected = !1,
	textImages = {},
	initLevel = {
		width: 5,
		height: 5,
		layerCount: 2,
		dat: [1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2],
		movementMask: [1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2],
		rigidGroupIndexMask: [],
		rigidMovementAppliedMask: [],
		bannedGroup: [],
		colCellContents: [],
		rowCellContents: [],
		colCellContents_Movements: [],
		rowCellContents_Movements: []
	},
	level = initLevel,
	font = {
		0: "\n00000\n00000\n00000\n01110\n10001\n10011\n10101\n11001\n10001\n01110\n00000\n00000",
		1: "\n00000\n00000\n00000\n11100\n00100\n00100\n00100\n00100\n00100\n11111\n00000\n00000",
		2: "\n00000\n00000\n00000\n11110\n00001\n00001\n01110\n10000\n10000\n11111\n00000\n00000",
		3: "\n00000\n00000\n00000\n11110\n00001\n00110\n00001\n00001\n00001\n11110\n00000\n00000",
		4: "\n00000\n00000\n00000\n10000\n10000\n10000\n10010\n11111\n00010\n00010\n00000\n00000",
		5: "\n00000\n00000\n00000\n11111\n10000\n11110\n00001\n00001\n00001\n11110\n00000\n00000",
		6: "\n00000\n00000\n00000\n01110\n10000\n11110\n10001\n10001\n10001\n01110\n00000\n00000",
		7: "\n00000\n00000\n00000\n11111\n00001\n00010\n00100\n00100\n00100\n00100\n00000\n00000",
		8: "\n00000\n00000\n00000\n01110\n10001\n01110\n10001\n10001\n10001\n01110\n00000\n00000",
		9: "\n00000\n00000\n00000\n01110\n10001\n10001\n10001\n01111\n00001\n01110\n00000\n00000",
		a: "\n00000\n00000\n00000\n00000\n00000\n01111\n10001\n10001\n10001\n01111\n00000\n00000",
		b: "\n00000\n00000\n00000\n10000\n10000\n11110\n10001\n10001\n10001\n01110\n00000\n00000",
		c: "\n00000\n00000\n00000\n00000\n00000\n01111\n10000\n10000\n10000\n01111\n00000\n00000",
		d: "\n00000\n00000\n00000\n00001\n00001\n01111\n10001\n10001\n10001\n01111\n00000\n00000",
		e: "\n00000\n00000\n00000\n00000\n00000\n01110\n10001\n11111\n10000\n01110\n00000\n00000",
		f: "\n00000\n00000\n00000\n00011\n00100\n11111\n00100\n00100\n00100\n00100\n00000\n00000",
		g: "\n00000\n00000\n00000\n00000\n00000\n01111\n10001\n10001\n10001\n01111\n00001\n01110",
		h: "\n00000\n00000\n00000\n10000\n10000\n11110\n10001\n10001\n10001\n10001\n00000\n00000",
		i: "\n00000\n00000\n00000\n00100\n00000\n01100\n00100\n00100\n00100\n01110\n00000\n00000",
		j: "\n00000\n00000\n00000\n00100\n00000\n01100\n00100\n00100\n00100\n00100\n10100\n01000",
		k: "\n00000\n00000\n00000\n10000\n10000\n10001\n10010\n11100\n10010\n10001\n00000\n00000",
		l: "\n00000\n00000\n00000\n01100\n00100\n00100\n00100\n00100\n00100\n01110\n00000\n00000",
		m: "\n00000\n00000\n00000\n00000\n00000\n01010\n10101\n10101\n10101\n10101\n00000\n00000",
		n: "\n00000\n00000\n00000\n00000\n00000\n01110\n10001\n10001\n10001\n10001\n00000\n00000",
		o: "\n00000\n00000\n00000\n00000\n00000\n01110\n10001\n10001\n10001\n01110\n00000\n00000",
		p: "\n00000\n00000\n00000\n00000\n00000\n11110\n10001\n10001\n10001\n11110\n10000\n10000",
		q: "\n00000\n00000\n00000\n00000\n00000\n01111\n10001\n10001\n10001\n01111\n00001\n00001",
		r: "\n00000\n00000\n00000\n00000\n00000\n01111\n10000\n10000\n10000\n10000\n00000\n00000",
		s: "\n00000\n00000\n00000\n00000\n00000\n01111\n10000\n01110\n00001\n11110\n00000\n00000",
		t: "\n00000\n00000\n00000\n00100\n00100\n11111\n00100\n00100\n00100\n00011\n00000\n00000",
		u: "\n00000\n00000\n00000\n00000\n00000\n10001\n10001\n10001\n10001\n01111\n00000\n00000",
		v: "\n00000\n00000\n00000\n00000\n00000\n10001\n10010\n10100\n11000\n10000\n00000\n00000",
		w: "\n00000\n00000\n00000\n00000\n00000\n10101\n10101\n10101\n10101\n01010\n00000\n00000",
		x: "\n00000\n00000\n00000\n00000\n00000\n10001\n01010\n00100\n01010\n10001\n00000\n00000",
		"×": "\n00000\n00000\n00000\n00000\n00000\n10001\n01010\n00100\n01010\n10001\n00000\n00000",
		y: "\n00000\n00000\n00000\n00000\n00000\n10001\n10001\n10001\n10001\n01111\n00001\n11110",
		z: "\n00000\n00000\n00000\n00000\n00000\n11111\n00010\n00100\n01000\n11111\n00000\n00000",
		A: "\n00000\n00000\n00000\n01110\n10001\n10001\n10001\n11111\n10001\n10001\n00000\n00000",
		B: "\n00000\n00000\n00000\n11110\n10001\n11110\n10001\n10001\n10001\n11110\n00000\n00000",
		C: "\n00000\n00000\n00000\n01111\n10000\n10000\n10000\n10000\n10000\n01111\n00000\n00000",
		D: "\n00000\n00000\n00000\n11110\n10001\n10001\n10001\n10001\n10001\n11110\n00000\n00000",
		E: "\n00000\n00000\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n11111\n00000\n00000",
		F: "\n00000\n00000\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n10000\n00000\n00000",
		G: "\n00000\n00000\n00000\n01111\n10000\n10000\n10000\n10011\n10001\n01111\n00000\n00000",
		H: "\n00000\n00000\n00000\n10001\n10001\n11111\n10001\n10001\n10001\n10001\n00000\n00000",
		I: "\n00000\n00000\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n11111\n00000\n00000",
		J: "\n00000\n00000\n00000\n01111\n00001\n00001\n00001\n00001\n00001\n01110\n00000\n00000",
		K: "\n00000\n00000\n00000\n10001\n10010\n10100\n11000\n10100\n10010\n10001\n00000\n00000",
		L: "\n00000\n00000\n00000\n10000\n10000\n10000\n10000\n10000\n10000\n11111\n00000\n00000",
		M: "\n00000\n00000\n00000\n11111\n10101\n10101\n10101\n10101\n10101\n10101\n00000\n00000",
		N: "\n00000\n00000\n00000\n10001\n11001\n10101\n10011\n10001\n10001\n10001\n00000\n00000",
		O: "\n00000\n00000\n00000\n01110\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		P: "\n00000\n00000\n00000\n11110\n10001\n10001\n10001\n11110\n10000\n10000\n00000\n00000",
		Q: "\n00000\n00000\n00000\n01110\n10001\n10001\n10001\n10001\n10101\n01110\n00100\n00000",
		R: "\n00000\n00000\n00000\n11110\n10001\n10001\n11110\n10001\n10001\n10001\n00000\n00000",
		S: "\n00000\n00000\n00000\n01111\n10000\n01110\n00001\n00001\n00001\n11110\n00000\n00000",
		T: "\n00000\n00000\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n00100\n00000\n00000",
		U: "\n00000\n00000\n00000\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		V: "\n00000\n00000\n00000\n10001\n10001\n10001\n10001\n10001\n01010\n00100\n00000\n00000",
		W: "\n00000\n00000\n00000\n10101\n10101\n10101\n10101\n10101\n10101\n01010\n00000\n00000",
		X: "\n00000\n00000\n00000\n10001\n10001\n01010\n00100\n01010\n10001\n10001\n00000\n00000",
		Y: "\n00000\n00000\n00000\n10001\n10001\n01010\n00100\n00100\n00100\n00100\n00000\n00000",
		Z: "\n00000\n00000\n00000\n11111\n00001\n00010\n00100\n01000\n10000\n11111\n00000\n00000",
		".": "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00100\n00000\n00000",
		"·": "\n00000\n00000\n00000\n00000\n00000\n00000\n00100\n00000\n00000\n00000\n00000\n00000",
		"•": "\n00000\n00000\n00000\n00000\n00000\n01110\n01110\n01110\n00000\n00000\n00000\n00000",
		"…": "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n10101\n00000\n00000",
		"†": "\n00000\n00100\n00100\n01110\n00100\n00100\n00100\n00100\n00100\n00100\n00000\n00000",
		"‡": "\n00000\n00100\n00100\n01110\n00100\n00100\n00100\n00100\n01110\n00100\n00000\n00000",
		"ƒ": "\n00000\n00000\n00000\n00011\n00100\n11111\n00100\n00100\n00100\n00100\n01000\n00000",
		"‚": "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00100\n01100\n00000\n00000",
		"„": "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n01001\n11011\n00000\n00000",
		",": "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00100\n01100\n00000\n00000",
		";": "\n00000\n00000\n00000\n00000\n00000\n00100\n00000\n00000\n00100\n01100\n00000\n00000",
		":": "\n00000\n00000\n00000\n00000\n00000\n00100\n00000\n00000\n00000\n00100\n00000\n00000",
		"?": "\n00000\n00000\n00000\n01110\n10001\n00001\n00001\n00110\n00000\n00100\n00000\n00000",
		"¿": "\n00000\n00000\n00000\n00100\n00000\n01100\n10000\n10000\n10001\n01110\n00000\n00000",
		"!": "\n00000\n00000\n00000\n00100\n00100\n00100\n00100\n00100\n00000\n00100\n00000\n00000",
		"¡": "\n00000\n00000\n00000\n00100\n00000\n00100\n00100\n00100\n00100\n00100\n00000\n00000",
		"@": "\n00000\n00000\n00000\n00000\n00000\n01110\n10001\n10111\n10000\n01110\n00000\n00000",
		"£": "\n00000\n00000\n00000\n00000\n00000\n01110\n01001\n11100\n01000\n11111\n00000\n00000",
		$: "\n00000\n00000\n00000\n00000\n00100\n01111\n10100\n01110\n00101\n11110\n00100\n00000",
		"%": "\n00000\n00000\n00000\n00000\n00000\n11001\n11010\n00100\n01011\n10011\n00000\n00000",
		"‰": "\n00000\n00000\n00000\n00000\n11001\n11010\n00100\n01011\n10011\n00000\n00011\n00011",
		"^": "\n00000\n00000\n00000\n00100\n01010\n00000\n00000\n00000\n00000\n00000\n00000\n00000",
		"&": "\n00000\n00000\n00000\n00000\n00000\n01100\n10000\n01011\n10010\n01100\n00000\n00000",
		"*": "\n00000\n00000\n00000\n00000\n00000\n01010\n00100\n01010\n00000\n00000\n00000\n00000",
		"(": "\n00000\n00000\n00000\n00010\n00100\n00100\n00100\n00100\n00100\n00010\n00000\n00000",
		")": "\n00000\n00000\n00000\n01000\n00100\n00100\n00100\n00100\n00100\n01000\n00000\n00000",
		"+": "\n00000\n00000\n00000\n00000\n00000\n00100\n00100\n11111\n00100\n00100\n00000\n00000",
		"÷": "\n00000\n00000\n00000\n00000\n00000\n00100\n00000\n11111\n00000\n00100\n00000\n00000",
		"±": "\n00000\n00000\n00000\n00000\n00000\n00100\n00100\n11111\n00100\n11111\n00000\n00000",
		"-": "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n01110\n00000\n00000\n00000\n00000",
		"–": "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n11110\n00000\n00000\n00000\n00000",
		"—": "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n11111\n00000\n00000\n00000\n00000",
		_: "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n11111\n00000\n00000",
		"=": "\n00000\n00000\n00000\n00000\n00000\n00000\n11111\n00000\n11111\n00000\n00000\n00000",
		" ": "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000",
		"{": "\n00000\n00000\n00000\n00110\n00100\n00100\n01100\n00100\n00100\n00110\n00000\n00000",
		"}": "\n00000\n00000\n00000\n01100\n00100\n00100\n00110\n00100\n00100\n01100\n00000\n00000",
		"[": "\n00000\n00000\n00000\n00110\n00100\n00100\n00100\n00100\n00100\n00110\n00000\n00000",
		"]": "\n00000\n00000\n00000\n01100\n00100\n00100\n00100\n00100\n00100\n01100\n00000\n00000",
		"'": "\n00000\n00000\n00000\n00100\n00100\n00100\n00000\n00000\n00000\n00000\n00000\n00000",
		"‘": "\n00000\n00000\n00000\n00110\n00100\n00000\n00000\n00000\n00000\n00000\n00000\n00000",
		"’": "\n00000\n00000\n00000\n00100\n01100\n00000\n00000\n00000\n00000\n00000\n00000\n00000",
		"“": "\n00000\n00000\n00000\n11011\n10010\n00000\n00000\n00000\n00000\n00000\n00000\n00000",
		"”": "\n00000\n00000\n00000\n01001\n11011\n00000\n00000\n00000\n00000\n00000\n00000\n00000",
		'"': "\n00000\n00000\n00000\n01010\n01010\n01010\n00000\n00000\n00000\n00000\n00000\n00000",
		"/": "\n00000\n00000\n00000\n00000\n00000\n00001\n00010\n00100\n01000\n10000\n00000\n00000",
		"\\": "\n00000\n00000\n00000\n00000\n00000\n10000\n01000\n00100\n00010\n00001\n00000\n00000",
		"|": "\n00000\n00000\n00000\n00000\n00000\n00100\n00100\n00100\n00100\n00100\n00000\n00000",
		"¦": "\n00000\n00000\n00000\n00000\n00100\n00100\n00000\n00100\n00100\n00100\n00000\n00000",
		"<": "\n00000\n00000\n00000\n00000\n00000\n00010\n00100\n01000\n00100\n00010\n00000\n00000",
		"‹": "\n00000\n00000\n00000\n00000\n00000\n00000\n00100\n01000\n00100\n00000\n00000\n00000",
		"«": "\n00000\n00000\n00000\n00000\n00000\n00000\n01001\n10010\n01001\n00000\n00000\n00000",
		">": "\n00000\n00000\n00000\n00000\n00000\n01000\n00100\n00010\n00100\n01000\n00000\n00000",
		"›": "\n00000\n00000\n00000\n00000\n00000\n00000\n00100\n00010\n00100\n00000\n00000\n00000",
		"»": "\n00000\n00000\n00000\n00000\n00000\n00000\n10010\n01001\n10010\n00000\n00000\n00000",
		"~": "\n00000\n00000\n00000\n00000\n00000\n00000\n01000\n10101\n00010\n00000\n00000\n00000",
		"˜": "\n00000\n00000\n00000\n00000\n00000\n01010\n10100\n00000\n00000\n00000\n00000\n00000",
		"`": "\n00000\n00000\n00000\n00000\n00000\n01000\n00100\n00000\n00000\n00000\n00000\n00000",
		"#": "\n00000\n00000\n00000\n00000\n00000\n01010\n11111\n01010\n11111\n01010\n00000\n00000",
		"À": "\n01000\n00100\n00000\n01110\n10001\n10001\n10001\n11111\n10001\n10001\n00000\n00000",
		"Á": "\n00010\n00100\n00000\n01110\n10001\n10001\n10001\n11111\n10001\n10001\n00000\n00000",
		"Â": "\n00100\n01010\n00000\n01110\n10001\n10001\n10001\n11111\n10001\n10001\n00000\n00000",
		"Ã": "\n01000\n10101\n00010\n01110\n10001\n10001\n10001\n11111\n10001\n10001\n00000\n00000",
		"Ä": "\n00000\n01010\n00000\n01110\n10001\n10001\n10001\n11111\n10001\n10001\n00000\n00000",
		"Å": "\n00100\n01010\n00100\n01110\n10001\n10001\n10001\n11111\n10001\n10001\n00000\n00000",
		"Æ": "\n00000\n00000\n00000\n01111\n10100\n10100\n10100\n11111\n10100\n10111\n00000\n00000",
		"Ç": "\n00000\n00000\n00000\n01111\n10000\n10000\n10000\n10000\n10000\n01111\n00100\n01000",
		"È": "\n01000\n00100\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n11111\n00000\n00000",
		"É": "\n00010\n00100\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n11111\n00000\n00000",
		"Ê": "\n00100\n01010\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n11111\n00000\n00000",
		"Ë": "\n00000\n01010\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n11111\n00000\n00000",
		"Ì": "\n01000\n00100\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n11111\n00000\n00000",
		"Í": "\n00010\n00100\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n11111\n00000\n00000",
		"Î": "\n00100\n01010\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n11111\n00000\n00000",
		"Ï": "\n00000\n01010\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n11111\n00000\n00000",
		"Ð": "\n00000\n00000\n00000\n01110\n01001\n01001\n11101\n01001\n01001\n01110\n00000\n00000",
		"Ñ": "\n01001\n10110\n00000\n10001\n11001\n10101\n10011\n10001\n10001\n10001\n00000\n00000",
		"Ò": "\n01000\n00100\n00000\n01110\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"Ó": "\n00010\n00100\n00000\n01110\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"Ô": "\n00100\n01010\n00000\n01110\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"Õ": "\n01001\n10110\n00000\n01110\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"Ö": "\n00000\n01010\n00000\n01110\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"Ø": "\n00000\n00010\n00100\n01110\n10101\n10101\n10101\n10101\n10101\n01110\n00100\n01000",
		"Ù": "\n00000\n01000\n00100\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"Ú": "\n00000\n00010\n00100\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"Û": "\n00100\n01010\n00000\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"Ü": "\n00000\n01010\n00000\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"Ý": "\n00000\n00000\n00100\n10001\n10001\n01010\n00100\n00100\n00100\n00100\n00000\n00000",
		"Þ": "\n00000\n00000\n10000\n11110\n10001\n10001\n10001\n10001\n10001\n11110\n10000\n00000",
		"ß": "\n00000\n00000\n00000\n01110\n10001\n10110\n10001\n10001\n10001\n10110\n10000\n00000",
		"ẞ": "\n00000\n00000\n00000\n01110\n10001\n10110\n10001\n10001\n10001\n10110\n00000\n00000",
		"à": "\n00000\n00000\n01000\n00100\n00000\n01111\n10001\n10001\n10001\n01111\n00000\n00000",
		"á": "\n00000\n00000\n00010\n00100\n00000\n01111\n10001\n10001\n10001\n01111\n00000\n00000",
		"â": "\n00000\n00000\n00100\n01010\n00000\n01111\n10001\n10001\n10001\n01111\n00000\n00000",
		"ã": "\n00000\n00000\n01001\n10110\n00000\n01111\n10001\n10001\n10001\n01111\n00000\n00000",
		"ä": "\n00000\n00000\n00000\n01010\n00000\n01111\n10001\n10001\n10001\n01111\n00000\n00000",
		"å": "\n00000\n00100\n01010\n00100\n00000\n01111\n10001\n10001\n10001\n01111\n00000\n00000",
		"æ": "\n00000\n00000\n00000\n00000\n00000\n01110\n10101\n10110\n10100\n01111\n00000\n00000",
		"ç": "\n00000\n00000\n00000\n00000\n00000\n01111\n10000\n10000\n10000\n01111\n00100\n01000",
		"è": "\n00000\n00000\n01000\n00100\n00000\n01110\n10001\n11111\n10000\n01110\n00000\n00000",
		"é": "\n00000\n00000\n00010\n00100\n00000\n01110\n10001\n11111\n10000\n01110\n00000\n00000",
		"ê": "\n00000\n00000\n00100\n01010\n00000\n01110\n10001\n11111\n10000\n01110\n00000\n00000",
		"ë": "\n00000\n00000\n00000\n01010\n00000\n01110\n10001\n11111\n10000\n01110\n00000\n00000",
		"ì": "\n00000\n00000\n01000\n00100\n00000\n01100\n00100\n00100\n00100\n01110\n00000\n00000",
		"í": "\n00000\n00000\n00010\n00100\n00000\n01100\n00100\n00100\n00100\n01110\n00000\n00000",
		"î": "\n00000\n00000\n00100\n01010\n00000\n01100\n00100\n00100\n00100\n01110\n00000\n00000",
		"ï": "\n00000\n00000\n00000\n01010\n00000\n01100\n00100\n00100\n00100\n01110\n00000\n00000",
		"ð": "\n00000\n00000\n00010\n00111\n00010\n01110\n10010\n10010\n10010\n01110\n00000\n00000",
		"ñ": "\n00000\n00000\n01001\n10110\n00000\n01110\n10001\n10001\n10001\n10001\n00000\n00000",
		"ò": "\n00000\n00000\n01000\n00100\n00000\n01110\n10001\n10001\n10001\n01110\n00000\n00000",
		"ó": "\n00000\n00000\n00010\n00100\n00000\n01110\n10001\n10001\n10001\n01110\n00000\n00000",
		"ô": "\n00000\n00000\n00100\n01010\n00000\n01110\n10001\n10001\n10001\n01110\n00000\n00000",
		"õ": "\n00000\n00000\n01001\n10110\n00000\n01110\n10001\n10001\n10001\n01110\n00000\n00000",
		"ö": "\n00000\n00000\n00000\n01010\n00000\n01110\n10001\n10001\n10001\n01110\n00000\n00000",
		"ø": "\n00000\n00000\n00000\n00010\n00100\n01110\n10101\n10101\n10101\n01110\n00100\n01000",
		"ù": "\n00000\n00000\n00000\n01000\n00100\n10001\n10001\n10001\n10001\n01111\n00000\n00000",
		"ú": "\n00000\n00000\n00000\n00010\n00100\n10001\n10001\n10001\n10001\n01111\n00000\n00000",
		"û": "\n00000\n00000\n00100\n01010\n00000\n10001\n10001\n10001\n10001\n01111\n00000\n00000",
		"ü": "\n00000\n00000\n00000\n01010\n00000\n10001\n10001\n10001\n10001\n01111\n00000\n00000",
		"ý": "\n00000\n00000\n00000\n00010\n00100\n10001\n10001\n10001\n10001\n01111\n00001\n11110",
		"þ": "\n00000\n00000\n00000\n10000\n10000\n11110\n10001\n10001\n10001\n11110\n10000\n10000",
		"ÿ": "\n00000\n00000\n00000\n01010\n00000\n10001\n10001\n10001\n10001\n01111\n00001\n11110",
		"Ā": "\n00000\n01110\n00000\n01110\n10001\n10001\n10001\n11111\n10001\n10001\n00000\n00000",
		"ā": "\n00000\n00000\n00000\n01110\n00000\n01111\n10001\n10001\n10001\n01111\n00000\n00000",
		"Ă": "\n01010\n00100\n00000\n01110\n10001\n10001\n10001\n11111\n10001\n10001\n00000\n00000",
		"ă": "\n00000\n00000\n01010\n00100\n00000\n01111\n10001\n10001\n10001\n01111\n00000\n00000",
		"Ą": "\n00000\n00000\n00000\n01110\n10001\n10001\n10001\n11111\n10001\n10001\n00010\n00001",
		"ą": "\n00000\n00000\n00000\n00000\n00000\n01111\n10001\n10001\n10001\n01111\n00010\n00001",
		"Ć": "\n00010\n00100\n00000\n01111\n10000\n10000\n10000\n10000\n10000\n01111\n00000\n00000",
		"ć": "\n00000\n00000\n00010\n00100\n00000\n01111\n10000\n10000\n10000\n01111\n00000\n00000",
		"Ĉ": "\n00100\n01010\n00000\n01111\n10000\n10000\n10000\n10000\n10000\n01111\n00000\n00000",
		"ĉ": "\n00000\n00000\n00100\n01010\n00000\n01111\n10000\n10000\n10000\n01111\n00000\n00000",
		"Ċ": "\n00000\n00100\n00000\n01111\n10000\n10000\n10000\n10000\n10000\n01111\n00000\n00000",
		"ċ": "\n00000\n00000\n00000\n00100\n00000\n01111\n10000\n10000\n10000\n01111\n00000\n00000",
		"Č": "\n01010\n00100\n00000\n01111\n10000\n10000\n10000\n10000\n10000\n01111\n00000\n00000",
		"č": "\n00000\n00000\n01010\n00100\n00000\n01111\n10000\n10000\n10000\n01111\n00000\n00000",
		"Ď": "\n01010\n00100\n00000\n11110\n10001\n10001\n10001\n10001\n10001\n11110\n00000\n00000",
		"ď": "\n00000\n00000\n00000\n00101\n00101\n01100\n10100\n10100\n10100\n01100\n00000\n00000",
		"Đ": "\n00000\n00000\n00000\n01110\n01001\n01001\n11101\n01001\n01001\n01110\n00000\n00000",
		"đ": "\n00000\n00000\n00010\n00111\n00010\n01110\n10010\n10010\n10010\n01110\n00000\n00000",
		"Ē": "\n00000\n01110\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n11111\n00000\n00000",
		"ē": "\n00000\n00000\n00000\n01110\n00000\n01110\n10001\n11111\n10000\n01110\n00000\n00000",
		"Ĕ": "\n01010\n00100\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n11111\n00000\n00000",
		"ĕ": "\n00000\n00000\n01010\n00100\n00000\n01110\n10001\n11111\n10000\n01110\n00000\n00000",
		"Ė": "\n00000\n00100\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n11111\n00000\n00000",
		"ė": "\n00000\n00000\n00000\n00100\n00000\n01110\n10001\n11111\n10000\n01110\n00000\n00000",
		"Ę": "\n00000\n00000\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n11111\n00010\n00001",
		"ę": "\n00000\n00000\n00000\n00000\n00000\n01110\n10001\n11111\n10000\n01110\n00010\n00001",
		"Ě": "\n01010\n00100\n00000\n11111\n10000\n11111\n10000\n10000\n10000\n11110\n00000\n00000",
		"ě": "\n00000\n00000\n01010\n00100\n00000\n01110\n10001\n11111\n10000\n01110\n00000\n00000",
		"Ĝ": "\n00100\n01010\n00000\n01111\n10000\n10000\n10000\n10011\n10001\n01111\n00000\n00000",
		"ĝ": "\n00000\n00000\n00100\n01010\n00000\n01111\n10001\n10001\n10001\n01111\n00001\n01110",
		"Ğ": "\n01010\n00100\n00000\n01111\n10000\n10000\n10000\n10011\n10001\n01111\n00000\n00000",
		"ğ": "\n00000\n00000\n01010\n00100\n00000\n01111\n10001\n10001\n10001\n01111\n00001\n01110",
		"Ġ": "\n00000\n00100\n00000\n01111\n10000\n10000\n10000\n10011\n10001\n01111\n00000\n00000",
		"ġ": "\n00000\n00000\n00000\n00100\n00000\n01111\n10001\n10001\n10001\n01111\n00001\n01110",
		"Ģ": "\n00000\n00000\n00000\n01111\n10000\n10000\n10000\n10011\n10001\n01111\n00000\n01100",
		"ģ": "\n00010\n00100\n00000\n01111\n10000\n10000\n10000\n10011\n10001\n01111\n00000\n00000",
		"Ĥ": "\n00100\n01010\n00000\n10001\n10001\n11111\n10001\n10001\n10001\n10001\n00000\n00000",
		"ĥ": "\n00100\n01010\n00000\n10000\n10000\n11110\n10001\n10001\n10001\n10001\n00000\n00000",
		"Ħ": "\n00000\n00000\n01010\n11111\n01010\n01110\n01010\n01010\n01010\n01010\n00000\n00000",
		"ħ": "\n00000\n00000\n01000\n11100\n01000\n01110\n01001\n01001\n01001\n01001\n00000\n00000",
		"Ĩ": "\n01001\n10110\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n11111\n00000\n00000",
		"ĩ": "\n01010\n10100\n00000\n00100\n00000\n01100\n00100\n00100\n00100\n01110\n00000\n00000",
		"Ī": "\n00000\n01110\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n11111\n00000\n00000",
		"ī": "\n00000\n00000\n00000\n01110\n00000\n01100\n00100\n00100\n00100\n01110\n00000\n00000",
		"Ĭ": "\n01010\n00100\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n11111\n00000\n00000",
		"ĭ": "\n00000\n00000\n01010\n00100\n00000\n01100\n00100\n00100\n00100\n01110\n00000\n00000",
		"Į": "\n00000\n00000\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n11111\n00010\n00001",
		"į": "\n00000\n00000\n00000\n00100\n00000\n01100\n00100\n00100\n00100\n01110\n00010\n00001",
		"İ": "\n00000\n00100\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n11111\n00000\n00000",
		"ı": "\n00000\n00000\n00000\n00000\n00000\n01100\n00100\n00100\n00100\n01110\n00000\n00000",
		"Ĳ": "\n00000\n00000\n00000\n10010\n10010\n10010\n10010\n10010\n10010\n10110\n00000\n00000",
		"ĳ": "\n00000\n00000\n00000\n01001\n00000\n11001\n01001\n01001\n01001\n11101\n00001\n00010",
		"Ĵ": "\n00010\n00101\n00000\n01111\n00001\n00001\n00001\n00001\n00001\n01110\n00000\n00000",
		"ĵ": "\n00000\n00000\n00100\n01010\n00000\n01100\n00100\n00100\n00100\n00100\n10100\n01000",
		"Ķ": "\n00000\n00000\n00000\n10001\n10010\n10100\n11000\n10100\n10010\n10001\n00100\n01000",
		"ķ": "\n00000\n00000\n00000\n10000\n10000\n10001\n10010\n11100\n10010\n10001\n00100\n01000",
		"ĸ": "\n00000\n00000\n00000\n00000\n00000\n10001\n10010\n11100\n10010\n10001\n00000\n00000",
		"Ĺ": "\n00000\n00010\n00100\n10000\n10000\n10000\n10000\n10000\n10000\n11111\n00000\n00000",
		"ĺ": "\n00010\n00100\n00000\n01100\n00100\n00100\n00100\n00100\n00100\n01110\n00000\n00000",
		"Ļ": "\n00000\n00000\n00000\n10000\n10000\n10000\n10000\n10000\n10000\n11111\n00000\n00100",
		"ļ": "\n00000\n00000\n00000\n01100\n00100\n00100\n00100\n00100\n00100\n01110\n00000\n00100",
		"Ľ": "\n00000\n00000\n00000\n10010\n10010\n10000\n10000\n10000\n10000\n11111\n00000\n00000",
		"ľ": "\n00000\n00000\n00000\n01101\n00101\n00100\n00100\n00100\n00100\n01110\n00000\n00000",
		"Ŀ": "\n00000\n00000\n00000\n10000\n10000\n10100\n10000\n10000\n10000\n11111\n00000\n00000",
		"ŀ": "\n00000\n00000\n00000\n01100\n00100\n00100\n00101\n00100\n00100\n01110\n00000\n00000",
		"Ł": "\n00000\n00000\n00000\n01000\n01010\n01100\n11000\n01000\n01000\n01111\n00000\n00000",
		"ł": "\n00000\n00000\n00000\n01100\n00100\n00100\n00110\n01100\n00100\n01110\n00000\n00000",
		"Ń": "\n00000\n00010\n00100\n10001\n11001\n10101\n10011\n10001\n10001\n10001\n00000\n00000",
		"ń": "\n00000\n00000\n00010\n00100\n00000\n01110\n10001\n10001\n10001\n10001\n00000\n00000",
		"Ņ": "\n00000\n00000\n00000\n10001\n11001\n10101\n10011\n10001\n10001\n10001\n00100\n01000",
		"ņ": "\n00000\n00000\n00000\n00000\n00000\n01110\n10001\n10001\n10001\n10001\n00100\n01000",
		"Ň": "\n00000\n01010\n00100\n10001\n11001\n10101\n10011\n10001\n10001\n10001\n00000\n00000",
		"ň": "\n00000\n00000\n01010\n00100\n00000\n01110\n10001\n10001\n10001\n10001\n00000\n00000",
		"ŉ": "\n00000\n00000\n00000\n10000\n10000\n00110\n01001\n01001\n01001\n01001\n00000\n00000",
		"Ŋ": "\n00000\n00000\n00000\n10001\n11001\n10101\n10011\n10001\n10001\n10001\n00001\n00010",
		"ŋ": "\n00000\n00000\n00000\n00000\n00000\n01110\n10001\n10001\n10001\n10001\n00001\n00010",
		"Ō": "\n00000\n01110\n00000\n01110\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"ō": "\n00000\n00000\n00000\n01110\n00000\n01110\n10001\n10001\n10001\n01110\n00000\n00000",
		"Ŏ": "\n01010\n00100\n00000\n01110\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"ŏ": "\n00000\n00000\n01010\n00100\n00000\n01110\n10001\n10001\n10001\n01110\n00000\n00000",
		"Ő": "\n01001\n10010\n00000\n01110\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"ő": "\n00000\n00000\n01001\n10010\n00000\n01110\n10001\n10001\n10001\n01110\n00000\n00000",
		"Œ": "\n00000\n00000\n00000\n01111\n10100\n10100\n10111\n10100\n10100\n01111\n00000\n00000",
		"œ": "\n00000\n00000\n00000\n00000\n00000\n01110\n10101\n10110\n10100\n01111\n00000\n00000",
		"Ŕ": "\n00010\n00100\n00000\n11110\n10001\n10001\n11110\n10001\n10001\n10001\n00000\n00000",
		"ŕ": "\n00000\n00000\n00010\n00100\n00000\n01111\n10000\n10000\n10000\n10000\n00000\n00000",
		"Ŗ": "\n00000\n00000\n00000\n11110\n10001\n10001\n11110\n10001\n10001\n10001\n00100\n01000",
		"ŗ": "\n00000\n00000\n00000\n00000\n00000\n01111\n10000\n10000\n10000\n10000\n00100\n01000",
		"Ř": "\n01010\n00100\n00000\n11110\n10001\n10001\n11110\n10001\n10001\n10001\n00000\n00000",
		"ř": "\n00000\n00000\n01010\n00100\n00000\n01111\n10000\n10000\n10000\n10000\n00000\n00000",
		"Ś": "\n00010\n00100\n00000\n01111\n10000\n01110\n00001\n00001\n00001\n11110\n00000\n00000",
		"ś": "\n00000\n00000\n00010\n00100\n00000\n01111\n10000\n01110\n00001\n11110\n00000\n00000",
		"Ŝ": "\n00100\n01010\n00000\n01111\n10000\n01110\n00001\n00001\n00001\n11110\n00000\n00000",
		"ŝ": "\n00000\n00000\n00100\n01010\n00000\n01111\n10000\n01110\n00001\n11110\n00000\n00000",
		"Ş": "\n00000\n00000\n00000\n01111\n10000\n01110\n00001\n00001\n00001\n11110\n00100\n00000",
		"ş": "\n00000\n00000\n00000\n00000\n00000\n01111\n10000\n01110\n00001\n11110\n00100\n01000",
		"Š": "\n01010\n00100\n00000\n01111\n10000\n01110\n00001\n00001\n00001\n11110\n00000\n00000",
		"š": "\n00000\n00000\n01010\n00100\n00000\n01111\n10000\n01110\n00001\n11110\n00000\n00000",
		"Ţ": "\n00000\n00000\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n00100\n00010\n00100",
		"ţ": "\n00000\n00000\n00000\n00100\n00100\n11111\n00100\n00100\n00100\n00011\n00000\n01100",
		"Ť": "\n01010\n00100\n00000\n11111\n00100\n00100\n00100\n00100\n00100\n00100\n00000\n00000",
		"ť": "\n00000\n00000\n00001\n00101\n00100\n11111\n00100\n00100\n00100\n00011\n00000\n00000",
		"Ŧ": "\n00000\n00000\n00000\n11111\n00100\n00100\n01110\n00100\n00100\n00100\n00000\n00000",
		"ŧ": "\n00000\n00000\n00000\n00100\n00100\n11111\n00100\n01110\n00100\n00011\n00000\n00000",
		"Ũ": "\n01001\n10110\n00000\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"ũ": "\n00000\n00000\n01001\n10110\n00000\n10001\n10001\n10001\n10001\n01111\n00000\n00000",
		"Ū": "\n00000\n01110\n00000\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"ū": "\n00000\n00000\n00000\n01110\n00000\n10001\n10001\n10001\n10001\n01111\n00000\n00000",
		"Ŭ": "\n01010\n00100\n00000\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"ŭ": "\n00000\n00000\n01010\n00100\n00000\n10001\n10001\n10001\n10001\n01111\n00000\n00000",
		"Ů": "\n00100\n01010\n00100\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"ů": "\n00000\n00000\n00100\n01010\n00100\n10001\n10001\n10001\n10001\n01111\n00000\n00000",
		"Ű": "\n01001\n10010\n00000\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00000\n00000",
		"ű": "\n00000\n00000\n01001\n10010\n00000\n10001\n10001\n10001\n10001\n01111\n00000\n00000",
		"Ų": "\n00000\n00000\n00000\n10001\n10001\n10001\n10001\n10001\n10001\n01110\n00100\n00010",
		"ų": "\n00000\n00000\n00000\n00000\n00000\n10001\n10001\n10001\n10001\n01111\n00010\n00001",
		"Ŵ": "\n00100\n01010\n00000\n10101\n10101\n10101\n10101\n10101\n10101\n01010\n00000\n00000",
		"ŵ": "\n00000\n00000\n00100\n01010\n00000\n10101\n10101\n10101\n10101\n01010\n00000\n00000",
		"Ŷ": "\n00100\n01010\n00000\n10001\n10001\n01010\n00100\n00100\n00100\n00100\n00000\n00000",
		"ŷ": "\n00000\n00000\n00100\n01010\n00000\n10001\n10001\n10001\n10001\n01111\n00001\n11110",
		"Ÿ": "\n00000\n01010\n00000\n10001\n10001\n01010\n00100\n00100\n00100\n00100\n00000\n00000",
		"Ź": "\n00010\n00100\n00000\n11111\n00001\n00010\n00100\n01000\n10000\n11111\n00000\n00000",
		"ź": "\n00000\n00000\n00010\n00100\n00000\n11111\n00010\n00100\n01000\n11111\n00000\n00000",
		"Ż": "\n00000\n00100\n00000\n11111\n00001\n00010\n00100\n01000\n10000\n11111\n00000\n00000",
		"ż": "\n00000\n00000\n00000\n00100\n00000\n11111\n00010\n00100\n01000\n11111\n00000\n00000",
		"Ž": "\n01010\n00100\n00000\n11111\n00001\n00010\n00100\n01000\n10000\n11111\n00000\n00000",
		"ž": "\n00000\n00000\n01010\n00100\n00000\n11111\n00010\n00100\n01000\n11111\n00000\n00000",
		"€": "\n00000\n00000\n00000\n00111\n01000\n11110\n01000\n11110\n01000\n00111\n00000\n00000",
		"™": "\n00000\n11111\n00100\n00100\n00100\n00000\n01010\n10101\n10101\n10101\n00000\n00000",
		"¢": "\n00000\n00000\n00000\n00010\n00100\n01111\n10100\n10100\n10100\n01111\n00100\n01000",
		"¤": "\n00000\n00000\n00000\n00000\n10001\n01110\n10001\n10001\n01110\n10001\n00000\n00000",
		"¥": "\n00000\n00000\n10001\n01010\n00100\n01110\n00100\n01110\n00100\n00000\n00000",
		"§": "\n00000\n00000\n00000\n01110\n10000\n01110\n10001\n01110\n00001\n01110\n00000\n00000",
		"¨": "\n00000\n00000\n00000\n01010\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000",
		"©": "\n00000\n00000\n00000\n01110\n10001\n10111\n10101\n10111\n10001\n01110\n00000\n00000",
		"®": "\n00000\n00000\n00000\n01110\n10001\n10111\n10101\n10101\n10001\n01110\n00000\n00000",
		"ª": "\n00000\n01110\n00010\n01110\n01010\n01110\n00000\n00000\n00000\n00000\n00000\n00000",
		"º": "\n00000\n00100\n01010\n01010\n01010\n00100\n00000\n00000\n00000\n00000\n00000\n00000",
		"¬": "\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n01110\n00010\n00000\n00000\n00000",
		"¯": "\n00000\n00000\n00000\n01110\n00000\n00000\n00000\n00000\n00000\n00000\n00000\n00000",
		"°": "\n00000\n00000\n00100\n01010\n00100\n00000\n00000\n00000\n00000\n00000\n00000\n00000"
	};

function RC4(e) {
	this.s = new Array(256), this.i = 0, this.j = 0;
	for (var n = 0; n < 256; n++) this.s[n] = n;
	e && this.mix(e)
}

function print_call_stack() {
	var e = (new Error).stack;
	console.log(e)
}

function RNG(e) {
	this.seed = e, null == e ? e = (Math.random() + Date.now()).toString() : "function" == typeof e ? (this.uniform = e, this.nextByte = function() {
		return ~~(256 * this.uniform())
	}, e = null) : "[object String]" !== Object.prototype.toString.call(e) && (e = JSON.stringify(e)), this._normal = null, this._state = e ? new RC4(e) : null
}
/**
 * Seedable random number generator functions.
 * @version 1.0.0
 * @license Public Domain
 *
 * @example
 * var rng = new RNG('Example');
 * rng.random(40, 50);  // =>  42
 * rng.uniform();       // =>  0.7972798995050903
 * rng.normal();        // => -0.6698504543216376
 * rng.exponential();   // =>  1.0547367609131555
 * rng.poisson(4);      // =>  2
 * rng.gamma(4);        // =>  2.781724687386858
 */
String.prototype.getBytes = function() {
	for (var e = [], n = 0; n < this.length; n++) {
		var t = this.charCodeAt(n),
			r = [];
		do {
			r.push(255 & t), t >>= 8
		} while (t > 0);
		e = e.concat(r.reverse())
	}
	return e
}, RC4.prototype._swap = function(e, n) {
	var t = this.s[e];
	this.s[e] = this.s[n], this.s[n] = t
}, RC4.prototype.mix = function(e) {
	for (var n = e.getBytes(), t = 0, r = 0; r < this.s.length; r++) t += this.s[r] + n[r % n.length], t %= 256, this._swap(r, t)
}, RC4.prototype.next = function() {
	return this.i = (this.i + 1) % 256, this.j = (this.j + this.s[this.i]) % 256, this._swap(this.i, this.j), this.s[(this.s[this.i] + this.s[this.j]) % 256]
}, RNG.prototype.nextByte = function() {
	return this._state.next()
}, RNG.prototype.uniform = function() {
	for (var e = 0, n = 0; n < 7; n++) e *= 256, e += this.nextByte();
	return e / (Math.pow(2, 56) - 1)
}, RNG.prototype.random = function(e, n) {
	return null == e ? this.uniform() : (null == n && (n = e, e = 0), e + Math.floor(this.uniform() * (n - e)))
}, RNG.prototype.normal = function() {
	if (null !== this._normal) {
		var e = this._normal;
		return this._normal = null, e
	}
	var n = this.uniform() || Math.pow(2, -53),
		t = this.uniform();
	return this._normal = Math.sqrt(-2 * Math.log(n)) * Math.sin(2 * Math.PI * t), Math.sqrt(-2 * Math.log(n)) * Math.cos(2 * Math.PI * t)
}, RNG.prototype.exponential = function() {
	return -Math.log(this.uniform() || Math.pow(2, -53))
}, RNG.prototype.poisson = function(e) {
	var n = Math.exp(-(e || 1)),
		t = 0,
		r = 1;
	do {
		t++, r *= this.uniform()
	} while (r > n);
	return t - 1
}, RNG.prototype.gamma = function(e) {
	var n = (e < 1 ? 1 + e : e) - 1 / 3,
		t = 1 / Math.sqrt(9 * n);
	do {
		do {
			var r = this.normal(),
				i = Math.pow(t * r + 1, 3)
		} while (i <= 0);
		var o = this.uniform(),
			a = Math.pow(r, 2)
	} while (o >= 1 - .0331 * a * a && Math.log(o) >= .5 * a + n * (1 - i + Math.log(i)));
	return e < 1 ? n * i * Math.exp(this.exponential() / -e) : n * i
}, RNG.roller = function(e, n) {
	var t = e.split(/(\d+)?d(\d+)([+-]\d+)?/).slice(1),
		r = parseFloat(t[0]) || 1,
		i = parseFloat(t[1]),
		o = parseFloat(t[2]) || 0;
	return n = n || new RNG,
		function() {
			for (var e = r + o, t = 0; t < r; t++) e += n.random(i);
			return e
		}
};
var FastBase64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	FastBase64_encLookup = [];

function FastBase64_Init() {
	for (var e = 0; e < 4096; e++) FastBase64_encLookup[e] = FastBase64_chars[e >> 6] + FastBase64_chars[63 & e]
}

function FastBase64_Encode(e) {
	for (var t = e.length, r = "", i = 0; t > 2;) n = e[i] << 16 | e[i + 1] << 8 | e[i + 2], r += FastBase64_encLookup[n >> 12] + FastBase64_encLookup[4095 & n], t -= 3, i += 3;
	if (t > 0) {
		var o = (252 & e[i]) >> 2,
			a = (3 & e[i]) << 4;
		if (t > 1 && (a |= (240 & e[++i]) >> 4), r += FastBase64_chars[o], r += FastBase64_chars[a], 2 == t) {
			var l = (15 & e[i++]) << 2;
			l |= (192 & e[i]) >> 6, r += FastBase64_chars[l]
		}
		1 == t && (r += "="), r += "="
	}
	return r
}

function u32ToArray(e) {
	return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
}

function u16ToArray(e) {
	return [255 & e, e >> 8 & 255]
}

function MakeRiff(e, n, t) {
	var r, i = {
		chunkId: [82, 73, 70, 70],
		chunkSize: 0,
		format: [87, 65, 86, 69],
		subChunk1Id: [102, 109, 116, 32],
		subChunk1Size: 16,
		audioFormat: 1,
		numChannels: 1,
		sampleRate: e,
		byteRate: 0,
		blockAlign: 0,
		bitsPerSample: n,
		subChunk2Id: [100, 97, 116, 97],
		subChunk2Size: 0
	};
	return i.byteRate = i.sampleRate * i.numChannels * i.bitsPerSample >> 3, i.blockAlign = i.numChannels * i.bitsPerSample >> 3, i.subChunk2Size = t.length, i.chunkSize = 36 + i.subChunk2Size, {
		dat: [],
		wav: r = i.chunkId.concat(u32ToArray(i.chunkSize), i.format, i.subChunk1Id, u32ToArray(i.subChunk1Size), u16ToArray(i.audioFormat), u16ToArray(i.numChannels), u32ToArray(i.sampleRate), u32ToArray(i.byteRate), u16ToArray(i.blockAlign), u16ToArray(i.bitsPerSample), i.subChunk2Id, u32ToArray(i.subChunk2Size), t),
		header: i,
		dataURI: "data:audio/wav;base64," + FastBase64_Encode(r)
	}
}
FastBase64_Init(), "undefined" != typeof exports && (exports.RIFFWAVE = RIFFWAVE);
var AUDIO_CONTEXT, SOUND_VOL = .25,
	SAMPLE_RATE = 5512,
	BIT_DEPTH = 8,
	SQUARE = 0,
	SAWTOOTH = 1,
	SINE = 2,
	NOISE = 3,
	TRIANGLE = 4,
	BREAKER = 5,
	SHAPES = ["square", "sawtooth", "sine", "noise", "triangle", "breaker"];

function checkAudioContextExists() {
	try {
		null == AUDIO_CONTEXT && ("undefined" != typeof AudioContext ? AUDIO_CONTEXT = new AudioContext : "undefined" != typeof webkitAudioContext && (AUDIO_CONTEXT = new webkitAudioContext))
	} catch (e) {
		window.console.log(e)
	}
}
checkAudioContextExists();
var rng, masterVolume = 1;

function Params() {
	var e = {};
	return e.wave_type = SQUARE, e.p_env_attack = 0, e.p_env_sustain = .3, e.p_env_punch = 0, e.p_env_decay = .4, e.p_base_freq = .3, e.p_freq_limit = 0, e.p_freq_ramp = 0, e.p_freq_dramp = 0, e.p_vib_strength = 0, e.p_vib_speed = 0, e.p_arp_mod = 0, e.p_arp_speed = 0, e.p_duty = 0, e.p_duty_ramp = 0, e.p_repeat_speed = 0, e.p_pha_offset = 0, e.p_pha_ramp = 0, e.p_lpf_freq = 1, e.p_lpf_ramp = 0, e.p_lpf_resonance = 0, e.p_hpf_freq = 0, e.p_hpf_ramp = 0, e.sound_vol = .5, e.sample_rate = 44100, e.bit_depth = 8, e
}
var seeded = !1;

function frnd(e) {
	return seeded ? rng.uniform() * e : Math.random() * e
}

function rnd(e) {
	return seeded ? Math.floor(rng.uniform() * (e + 1)) : Math.floor(Math.random() * (e + 1))
}
pickupCoin = function() {
	var e = Params();
	if (e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = 0), e.p_base_freq = .4 + frnd(.5), e.p_env_attack = 0, e.p_env_sustain = frnd(.1), e.p_env_decay = .1 + frnd(.4), e.p_env_punch = .3 + frnd(.3), rnd(1)) {
		e.p_arp_speed = .5 + frnd(.2);
		var n = 1 + (1 | frnd(7)),
			t = n + (1 | frnd(7)) + 2;
		e.p_arp_mod = +n / +t
	}
	return e
}, laserShoot = function() {
	var e = Params();
	return e.wave_type = rnd(2), e.wave_type === SINE && rnd(1) && (e.wave_type = rnd(1)), e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), e.p_base_freq = .5 + frnd(.5), e.p_freq_limit = e.p_base_freq - .2 - frnd(.6), e.p_freq_limit < .2 && (e.p_freq_limit = .2), e.p_freq_ramp = -.15 - frnd(.2), 0 === rnd(2) && (e.p_base_freq = .3 + frnd(.6), e.p_freq_limit = frnd(.1), e.p_freq_ramp = -.35 - frnd(.3)), rnd(1) ? (e.p_duty = frnd(.5), e.p_duty_ramp = frnd(.2)) : (e.p_duty = .4 + frnd(.5), e.p_duty_ramp = -frnd(.7)), e.p_env_attack = 0, e.p_env_sustain = .1 + frnd(.2), e.p_env_decay = frnd(.4), rnd(1) && (e.p_env_punch = frnd(.3)), 0 === rnd(2) && (e.p_pha_offset = frnd(.2), e.p_pha_ramp = -frnd(.2)), rnd(1) && (e.p_hpf_freq = frnd(.3)), e
}, explosion = function() {
	var e = Params();
	return rnd(1) ? (e.p_base_freq = .1 + frnd(.4), e.p_freq_ramp = -.1 + frnd(.4)) : (e.p_base_freq = .2 + frnd(.7), e.p_freq_ramp = -.2 - frnd(.2)), e.p_base_freq *= e.p_base_freq, 0 === rnd(4) && (e.p_freq_ramp = 0), 0 === rnd(2) && (e.p_repeat_speed = .3 + frnd(.5)), e.p_env_attack = 0, e.p_env_sustain = .1 + frnd(.3), e.p_env_decay = frnd(.5), 0 === rnd(1) && (e.p_pha_offset = -.3 + frnd(.9), e.p_pha_ramp = -frnd(.3)), e.p_env_punch = .2 + frnd(.6), rnd(1) && (e.p_vib_strength = frnd(.7), e.p_vib_speed = frnd(.6)), 0 === rnd(2) && (e.p_arp_speed = .6 + frnd(.3), e.p_arp_mod = .8 - frnd(1.6)), e
}, birdSound = function() {
	var e = Params();
	return frnd(10) < 1 ? (e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), e.p_env_attack = .4304400932967592 + frnd(.2) - .1, e.p_env_sustain = .15739346034252394 + frnd(.2) - .1, e.p_env_punch = .004488201744871758 + frnd(.2) - .1, e.p_env_decay = .07478075528212291 + frnd(.2) - .1, e.p_base_freq = .9865265720147687 + frnd(.2) - .1, e.p_freq_limit = 0 + frnd(.2) - .1, e.p_freq_ramp = -.2995018224359539 + frnd(.2) - .1, frnd(1) < .5 && (e.p_freq_ramp = .1 + frnd(.15)), e.p_freq_dramp = .004598608156964473 + frnd(.1) - .05, e.p_vib_strength = -.2202799497929496 + frnd(.2) - .1, e.p_vib_speed = .8084998703158364 + frnd(.2) - .1, e.p_arp_mod = 0, e.p_arp_speed = 0, e.p_duty = -.9031808754347107 + frnd(.2) - .1, e.p_duty_ramp = -.8128699999808343 + frnd(.2) - .1, e.p_repeat_speed = .601486018931999 + frnd(.2) - .1, e.p_pha_offset = -.9424902314367765 + frnd(.2) - .1, e.p_pha_ramp = -.1055482222272056 + frnd(.2) - .1, e.p_lpf_freq = .9989765717851521 + frnd(.2) - .1, e.p_lpf_ramp = -.25051720626043017 + frnd(.2) - .1, e.p_lpf_resonance = .32777871505494693 + frnd(.2) - .1, e.p_hpf_freq = .0023548750981756753 + frnd(.2) - .1, e.p_hpf_ramp = -.002375673204842568 + frnd(.2) - .1, e) : frnd(10) < 1 ? (e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), e.p_env_attack = .5277795946672003 + frnd(.2) - .1, e.p_env_sustain = .18243733568468432 + frnd(.2) - .1, e.p_env_punch = -.020159754546840117 + frnd(.2) - .1, e.p_env_decay = .1561353422051903 + frnd(.2) - .1, e.p_base_freq = .9028855606533718 + frnd(.2) - .1, e.p_freq_limit = -.008842787837148716, e.p_freq_ramp = -.1, e.p_freq_dramp = -.012891241489551925, e.p_vib_strength = -.17923136138403065 + frnd(.2) - .1, e.p_vib_speed = .908263385610142 + frnd(.2) - .1, e.p_arp_mod = .41690153355414894 + frnd(.2) - .1, e.p_arp_speed = .0010766233195860704 + frnd(.2) - .1, e.p_duty = -.8735363011184684 + frnd(.2) - .1, e.p_duty_ramp = -.7397985366747507 + frnd(.2) - .1, e.p_repeat_speed = .0591789344172107 + frnd(.2) - .1, e.p_pha_offset = -.9961184222777699 + frnd(.2) - .1, e.p_pha_ramp = -.08234769395850523 + frnd(.2) - .1, e.p_lpf_freq = .9412475115697335 + frnd(.2) - .1, e.p_lpf_ramp = -.18261358925834958 + frnd(.2) - .1, e.p_lpf_resonance = .24541438107389477 + frnd(.2) - .1, e.p_hpf_freq = -.01831940280978611 + frnd(.2) - .1, e.p_hpf_ramp = -.03857383633171346 + frnd(.2) - .1, e) : frnd(10) < 1 ? (e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), e.p_env_attack = .4304400932967592 + frnd(.2) - .1, e.p_env_sustain = .15739346034252394 + frnd(.2) - .1, e.p_env_punch = .004488201744871758 + frnd(.2) - .1, e.p_env_decay = .07478075528212291 + frnd(.2) - .1, e.p_base_freq = .9865265720147687 + frnd(.2) - .1, e.p_freq_limit = 0 + frnd(.2) - .1, e.p_freq_ramp = -.2995018224359539 + frnd(.2) - .1, e.p_freq_dramp = .004598608156964473 + frnd(.2) - .1, e.p_vib_strength = -.2202799497929496 + frnd(.2) - .1, e.p_vib_speed = .8084998703158364 + frnd(.2) - .1, e.p_arp_mod = -.46410459213693644 + frnd(.2) - .1, e.p_arp_speed = -.10955361249587248 + frnd(.2) - .1, e.p_duty = -.9031808754347107 + frnd(.2) - .1, e.p_duty_ramp = -.8128699999808343 + frnd(.2) - .1, e.p_repeat_speed = .7014860189319991 + frnd(.2) - .1, e.p_pha_offset = -.9424902314367765 + frnd(.2) - .1, e.p_pha_ramp = -.1055482222272056 + frnd(.2) - .1, e.p_lpf_freq = .9989765717851521 + frnd(.2) - .1, e.p_lpf_ramp = -.25051720626043017 + frnd(.2) - .1, e.p_lpf_resonance = .32777871505494693 + frnd(.2) - .1, e.p_hpf_freq = .0023548750981756753 + frnd(.2) - .1, e.p_hpf_ramp = -.002375673204842568 + frnd(.2) - .1, e) : frnd(5) > 1 ? (e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), rnd(1) ? (e.p_arp_mod = .2697849293151393 + frnd(.2) - .1, e.p_arp_speed = -.3131172257760948 + frnd(.2) - .1, e.p_base_freq = .8090588299313949 + frnd(.2) - .1, e.p_duty = -.6210022920964955 + frnd(.2) - .1, e.p_duty_ramp = -.00043441813553182567 + frnd(.2) - .1, e.p_env_attack = .004321877246874195 + frnd(.2) - .1, e.p_env_decay = .1 + frnd(.2) - .1, e.p_env_punch = .061737781504416146 + frnd(.2) - .1, e.p_env_sustain = .4987252564798832 + frnd(.2) - .1, e.p_freq_dramp = .31700340314222614 + frnd(.2) - .1, e.p_freq_limit = 0 + frnd(.2) - .1, e.p_freq_ramp = -.163380391341416 + frnd(.2) - .1, e.p_hpf_freq = .4709005021145149 + frnd(.2) - .1, e.p_hpf_ramp = .6924667290539194 + frnd(.2) - .1, e.p_lpf_freq = .8351398631384511 + frnd(.2) - .1, e.p_lpf_ramp = .36616557192873134 + frnd(.2) - .1, e.p_lpf_resonance = -.08685777111664439 + frnd(.2) - .1, e.p_pha_offset = -.036084571580025544 + frnd(.2) - .1, e.p_pha_ramp = -.014806445085568108 + frnd(.2) - .1, e.p_repeat_speed = -.8094368475518489 + frnd(.2) - .1, e.p_vib_speed = .4496665457171294 + frnd(.2) - .1, e.p_vib_strength = .23413762515532424 + frnd(.2) - .1) : (e.p_arp_mod = -.35697118026766184 + frnd(.2) - .1, e.p_arp_speed = .3581140690559588 + frnd(.2) - .1, e.p_base_freq = 1.3260897696157528 + frnd(.2) - .1, e.p_duty = -.30984900436710694 + frnd(.2) - .1, e.p_duty_ramp = -.0014374759133411626 + frnd(.2) - .1, e.p_env_attack = .3160357835682254 + frnd(.2) - .1, e.p_env_decay = .1 + frnd(.2) - .1, e.p_env_punch = .24323114016870148 + frnd(.2) - .1, e.p_env_sustain = .4 + frnd(.2) - .1, e.p_freq_dramp = .2866475886237244 + frnd(.2) - .1, e.p_freq_limit = 0 + frnd(.2) - .1, e.p_freq_ramp = -.10956352368742976 + frnd(.2) - .1, e.p_hpf_freq = .20772718017889846 + frnd(.2) - .1, e.p_hpf_ramp = .1564090637378835 + frnd(.2) - .1, e.p_lpf_freq = .6021372770637031 + frnd(.2) - .1, e.p_lpf_ramp = .24016227139979027 + frnd(.2) - .1, e.p_lpf_resonance = -.08787383821160144 + frnd(.2) - .1, e.p_pha_offset = -.381597686151701 + frnd(.2) - .1, e.p_pha_ramp = -.0002481687661373495 + frnd(.2) - .1, e.p_repeat_speed = .07812112809425686 + frnd(.2) - .1, e.p_vib_speed = -.13648848579133943 + frnd(.2) - .1, e.p_vib_strength = .0018874158972302657 + frnd(.2) - .1), e) : (e.wave_type = Math.floor(frnd(SHAPES.length)), 1 !== e.wave_type && 3 !== e.wave_type || (e.wave_type = 2), e.p_base_freq = .85 + frnd(.15), e.p_freq_ramp = .3 + frnd(.15), e.p_env_attack = 0 + frnd(.09), e.p_env_sustain = .2 + frnd(.3), e.p_env_decay = 0 + frnd(.1), e.p_duty = frnd(2) - 1, e.p_duty_ramp = Math.pow(frnd(2) - 1, 3), e.p_repeat_speed = .5 + frnd(.1), e.p_pha_offset = -.3 + frnd(.9), e.p_pha_ramp = -frnd(.3), e.p_arp_speed = .4 + frnd(.6), e.p_arp_mod = .8 + frnd(.1), e.p_lpf_resonance = frnd(2) - 1, e.p_lpf_freq = 1 - Math.pow(frnd(1), 3), e.p_lpf_ramp = Math.pow(frnd(2) - 1, 3), e.p_lpf_freq < .1 && e.p_lpf_ramp < -.05 && (e.p_lpf_ramp = -e.p_lpf_ramp), e.p_hpf_freq = Math.pow(frnd(1), 5), e.p_hpf_ramp = Math.pow(frnd(2) - 1, 5), e)
}, pushSound = function() {
	var e = Params();
	return e.wave_type = Math.floor(frnd(SHAPES.length)), 2 === e.wave_type && e.wave_type++, 0 === e.wave_type && (e.wave_type = NOISE), e.p_base_freq = .1 + frnd(.4), e.p_freq_ramp = .05 + frnd(.2), e.p_env_attack = .01 + frnd(.09), e.p_env_sustain = .01 + frnd(.09), e.p_env_decay = .01 + frnd(.09), e.p_repeat_speed = .3 + frnd(.5), e.p_pha_offset = -.3 + frnd(.9), e.p_pha_ramp = -frnd(.3), e.p_arp_speed = .6 + frnd(.3), e.p_arp_mod = .8 - frnd(1.6), e
}, powerUp = function() {
	var e = Params();
	return rnd(1) ? e.wave_type = SAWTOOTH : e.p_duty = frnd(.6), e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), rnd(1) ? (e.p_base_freq = .2 + frnd(.3), e.p_freq_ramp = .1 + frnd(.4), e.p_repeat_speed = .4 + frnd(.4)) : (e.p_base_freq = .2 + frnd(.3), e.p_freq_ramp = .05 + frnd(.2), rnd(1) && (e.p_vib_strength = frnd(.7), e.p_vib_speed = frnd(.6))), e.p_env_attack = 0, e.p_env_sustain = frnd(.4), e.p_env_decay = .1 + frnd(.4), e
}, hitHurt = function() {
	return result = Params(), result.wave_type = rnd(2), result.wave_type === SINE && (result.wave_type = NOISE), result.wave_type === SQUARE && (result.p_duty = frnd(.6)), result.wave_type = Math.floor(frnd(SHAPES.length)), result.p_base_freq = .2 + frnd(.6), result.p_freq_ramp = -.3 - frnd(.4), result.p_env_attack = 0, result.p_env_sustain = frnd(.1), result.p_env_decay = .1 + frnd(.2), rnd(1) && (result.p_hpf_freq = frnd(.3)), result
}, jump = function() {
	return result = Params(), result.wave_type = SQUARE, result.wave_type = Math.floor(frnd(SHAPES.length)), 3 === result.wave_type && (result.wave_type = SQUARE), result.p_duty = frnd(.6), result.p_base_freq = .3 + frnd(.3), result.p_freq_ramp = .1 + frnd(.2), result.p_env_attack = 0, result.p_env_sustain = .1 + frnd(.3), result.p_env_decay = .1 + frnd(.2), rnd(1) && (result.p_hpf_freq = frnd(.3)), rnd(1) && (result.p_lpf_freq = 1 - frnd(.6)), result
}, blipSelect = function() {
	return result = Params(), result.wave_type = rnd(1), result.wave_type = Math.floor(frnd(SHAPES.length)), 3 === result.wave_type && (result.wave_type = rnd(1)), result.wave_type === SQUARE && (result.p_duty = frnd(.6)), result.p_base_freq = .2 + frnd(.4), result.p_env_attack = 0, result.p_env_sustain = .1 + frnd(.1), result.p_env_decay = frnd(.2), result.p_hpf_freq = .1, result
}, random = function() {
	return result = Params(), result.wave_type = Math.floor(frnd(SHAPES.length)), result.p_base_freq = Math.pow(frnd(2) - 1, 2), rnd(1) && (result.p_base_freq = Math.pow(frnd(2) - 1, 3) + .5), result.p_freq_limit = 0, result.p_freq_ramp = Math.pow(frnd(2) - 1, 5), result.p_base_freq > .7 && result.p_freq_ramp > .2 && (result.p_freq_ramp = -result.p_freq_ramp), result.p_base_freq < .2 && result.p_freq_ramp < -.05 && (result.p_freq_ramp = -result.p_freq_ramp), result.p_freq_dramp = Math.pow(frnd(2) - 1, 3), result.p_duty = frnd(2) - 1, result.p_duty_ramp = Math.pow(frnd(2) - 1, 3), result.p_vib_strength = Math.pow(frnd(2) - 1, 3), result.p_vib_speed = frnd(2) - 1, result.p_env_attack = Math.pow(frnd(2) - 1, 3), result.p_env_sustain = Math.pow(frnd(2) - 1, 2), result.p_env_decay = frnd(2) - 1, result.p_env_punch = Math.pow(frnd(.8), 2), result.p_env_attack + result.p_env_sustain + result.p_env_decay < .2 && (result.p_env_sustain += .2 + frnd(.3), result.p_env_decay += .2 + frnd(.3)), result.p_lpf_resonance = frnd(2) - 1, result.p_lpf_freq = 1 - Math.pow(frnd(1), 3), result.p_lpf_ramp = Math.pow(frnd(2) - 1, 3), result.p_lpf_freq < .1 && result.p_lpf_ramp < -.05 && (result.p_lpf_ramp = -result.p_lpf_ramp), result.p_hpf_freq = Math.pow(frnd(1), 5), result.p_hpf_ramp = Math.pow(frnd(2) - 1, 5), result.p_pha_offset = Math.pow(frnd(2) - 1, 3), result.p_pha_ramp = Math.pow(frnd(2) - 1, 3), result.p_repeat_speed = frnd(2) - 1, result.p_arp_speed = frnd(2) - 1, result.p_arp_mod = frnd(2) - 1, result
};
var generators = [pickupCoin, laserShoot, explosion, powerUp, hitHurt, jump, blipSelect, pushSound, random, birdSound],
	generatorNames = ["pickupCoin", "laserShoot", "explosion", "powerUp", "hitHurt", "jump", "blipSelect", "pushSound", "random", "birdSound"];

function SoundEffect(e, n) {
	this._buffer = AUDIO_CONTEXT.createBuffer(1, e, n)
}

function ULBS() {
	if ("suspended" === AUDIO_CONTEXT.state) {
		var e = function() {
			AUDIO_CONTEXT.resume().then((function() {
				document.body.removeEventListener("touchstart", e), document.body.removeEventListener("touchend", e), document.body.removeEventListener("mousedown", e), document.body.removeEventListener("mouseup", e), document.body.removeEventListener("keydown", e), document.body.removeEventListener("keyup", e)
			}))
		};
		document.body.addEventListener("touchstart", e, !1), document.body.addEventListener("touchend", e, !1), document.body.addEventListener("mousedown", e, !1), document.body.addEventListener("mouseup", e, !1), document.body.addEventListener("keydown", e, !1), document.body.addEventListener("keyup", e, !1)
	}
}
if (generateFromSeed = function(e) {
		rng = new RNG(e / 100 | 0);
		var n = generators[e % 100 % generators.length];
		seeded = !0;
		var t = n();
		return t.seed = e, seeded = !1, t
	}, SoundEffect.prototype.getBuffer = function() {
		return this._buffer.getChannelData(0)
	}, SoundEffect.prototype.play = function() {
		ULBS();
		var e = AUDIO_CONTEXT.createBufferSource(),
			n = AUDIO_CONTEXT.createBiquadFilter(),
			t = AUDIO_CONTEXT.createBiquadFilter(),
			r = AUDIO_CONTEXT.createBiquadFilter();
		e.buffer = this._buffer, e.connect(n), n.frequency.value = 1600, t.frequency.value = 1600, r.frequency.value = 1600, n.connect(t), t.connect(r), r.connect(AUDIO_CONTEXT.destination);
		var i = AUDIO_CONTEXT.currentTime;
		void 0 !== e.start ? e.start(i) : e.noteOn(i), e.onended = function() {
			r.disconnect()
		}
	}, SoundEffect.MIN_SAMPLE_RATE = 22050, void 0 === AUDIO_CONTEXT && ((SoundEffect = function(e, n) {
		this._sample_rate = n, this._buffer = new Array(e), this._audioElement = null
	}).prototype.getBuffer = function() {
		return this._audioElement = null, this._buffer
	}, SoundEffect.prototype.play = function() {
		if (this._audioElement) this._audioElement.cloneNode(!1).play();
		else {
			for (var e = 0; e < this._buffer.length; e++) this._buffer[e] = 255 & Math.floor(128 * Math.max(0, Math.min(this._buffer[e] + 1, 2)));
			var n = MakeRiff(this._sample_rate, BIT_DEPTH, this._buffer);
			this._audioElement = new Audio, this._audioElement.src = n.dataURI, this._audioElement.play()
		}
	}, SoundEffect.MIN_SAMPLE_RATE = 1), SoundEffect.generate = function(e) {
		function n() {
			t = 0, r = 100 / (e.p_base_freq * e.p_base_freq + .001), i = Math.floor(r), o = 100 / (e.p_freq_limit * e.p_freq_limit + .001), a = 1 - .01 * Math.pow(e.p_freq_ramp, 3), l = 1e-6 * -Math.pow(e.p_freq_dramp, 3), s = .5 - .5 * e.p_duty, c = 5e-5 * -e.p_duty_ramp, u = e.p_arp_mod >= 0 ? 1 - .9 * Math.pow(e.p_arp_mod, 2) : 1 + 10 * Math.pow(e.p_arp_mod, 2), 0, d = Math.floor(2e4 * Math.pow(1 - e.p_arp_speed, 2) + 32), 1 == e.p_arp_speed && (d = 0)
		}
		var t, r, i, o, a, l, s, c, u, d;
		n();
		var h = 0,
			f = 0,
			p = .1 * Math.pow(e.p_lpf_freq, 3),
			g = 1 + 1e-4 * e.p_lpf_ramp,
			m = 5 / (1 + 20 * Math.pow(e.p_lpf_resonance, 2)) * (.01 + p);
		m > .8 && (m = .8);
		var v = 0,
			y = .1 * Math.pow(e.p_hpf_freq, 2),
			b = 1 + 3e-4 * e.p_hpf_ramp,
			w = 0,
			_ = .01 * Math.pow(e.p_vib_speed, 2),
			C = .5 * e.p_vib_strength,
			k = 0,
			x = 0,
			S = 0,
			M = [Math.floor(e.p_env_attack * e.p_env_attack * 1e5), Math.floor(e.p_env_sustain * e.p_env_sustain * 1e5), Math.floor(e.p_env_decay * e.p_env_decay * 1e5)],
			E = M[0] + M[1] + M[2],
			R = 0,
			T = 1020 * Math.pow(e.p_pha_offset, 2);
		e.p_pha_offset < 0 && (T = -T);
		var L = 1 * Math.pow(e.p_pha_ramp, 2);
		e.p_pha_ramp < 0 && (L = -L);
		for (var I = Math.abs(Math.floor(T)), O = 0, A = [], D = 0; D < 1024; ++D) A[D] = 0;
		var N = [];
		for (D = 0; D < 32; ++D) N[D] = 2 * Math.random() - 1;
		var B = Math.floor(2e4 * Math.pow(1 - e.p_repeat_speed, 2) + 32);
		0 == e.p_repeat_speed && (B = 0);
		for (var P, F = e.sound_vol, j = (F = Math.exp(e.sound_vol) - 1, 0), H = 0, z = Math.floor(44100 / e.sample_rate), W = 0, U = Math.ceil(E / z), V = (P = e.sample_rate < SoundEffect.MIN_SAMPLE_RATE ? new SoundEffect(4 * U, SoundEffect.MIN_SAMPLE_RATE) : new SoundEffect(U, e.sample_rate)).getBuffer(), q = 0;; ++q) {
			0 != B && ++t >= B && n(), 0 != d && q >= d && (d = 0, r *= u), (r *= a += l) > o && (r = o, e.p_freq_limit > 0 && !0);
			var G = r;
			if (C > 0 && (w += _, G = r * (1 + Math.sin(w) * C)), (i = Math.floor(G)) < 8 && (i = 8), (s += c) < 0 && (s = 0), s > .5 && (s = .5), ++S > M[x]) {
				for (S = 1, x++; x < 3 && 0 === M[x];) x++;
				if (3 === x) break
			}
			k = 0 === x ? S / M[0] : 1 === x ? 1 + 2 * Math.pow(1 - S / M[1], 1) * e.p_env_punch : 1 - S / M[2], T += L, (I = Math.abs(Math.floor(T))) > 1023 && (I = 1023), 0 != b && ((y *= b) < 1e-5 && (y = 1e-5), y > .1 && (y = .1));
			for (var X = 0, Y = 0; Y < 8; ++Y) {
				var J = 0;
				if (++R >= i && (R %= i, e.wave_type === NOISE))
					for (D = 0; D < 32; ++D) N[D] = 2 * Math.random() - 1;
				var K = R / i;
				if (e.wave_type === SQUARE) J = K < s ? .5 : -.5;
				else if (e.wave_type === SAWTOOTH) J = 1 - 2 * K;
				else if (e.wave_type === SINE) J = Math.sin(2 * K * Math.PI);
				else if (e.wave_type === NOISE) J = N[Math.floor(32 * R / i)];
				else if (e.wave_type === TRIANGLE) J = Math.abs(1 - 2 * K) - 1;
				else {
					if (e.wave_type !== BREAKER) throw new Exception("bad wave type! " + e.wave_type);
					J = Math.abs(1 - K * K * 2) - 1
				}
				var $ = h;
				(p *= g) < 0 && (p = 0), p > .1 && (p = .1), 1 != e.p_lpf_freq ? (f += (J - h) * p, f -= f * m) : (h = J, f = 0), v += (h += f) - $, J = v -= v * y, A[1023 & O] = J, J += A[O - I + 1024 & 1023], O = O + 1 & 1023, X += J * k
			}
			j += X, ++H >= z && (H = 0, X = j / z, j = 0, X = X / 8 * masterVolume, X *= F, V[W++] = X, e.sample_rate < SoundEffect.MIN_SAMPLE_RATE && (V[W++] = X, V[W++] = X, V[W++] = X))
		}
		return z > 0 && (X = (X = j / z) / 8 * masterVolume, X *= F, V[W++] = X, e.sample_rate < SoundEffect.MIN_SAMPLE_RATE && (V[W++] = X, V[W++] = X, V[W++] = X)), P
	}, "undefined" != typeof exports) {
	var RIFFWAVE = require("./riffwave").RIFFWAVE;
	exports.Params = Params, exports.generate = generate
}
var sfxCache = {},
	cachedSeeds = [],
	CACHE_MAX = 50;

function cacheSeed(e) {
	if (e in sfxCache) return sfxCache[e];
	var n = generateFromSeed(e);
	n.sound_vol = SOUND_VOL, n.sample_rate = SAMPLE_RATE, n.bit_depth = BIT_DEPTH;
	var t = SoundEffect.generate(n);
	for (sfxCache[e] = t, cachedSeeds.push(e); cachedSeeds.length > CACHE_MAX;) {
		var r = cachedSeeds[0];
		cachedSeeds = cachedSeeds.slice(1), delete sfxCache[r]
	}
	return t
}

function playSound(e, n) {
	(!0 !== n && pushSoundToHistory(e), muted) || (checkAudioContextExists(), unitTesting || cacheSeed(e).play())
}

function killAudioButton() {
	var e = document.getElementById("muteButton"),
		n = document.getElementById("unMuteButton");
	e && (e.remove(), n.remove())
}

function showAudioButton() {
	var e = document.getElementById("muteButton"),
		n = document.getElementById("unMuteButton");
	e && (e.style.display = "block", n.style.display = "none")
}

function toggleMute() {
	0 === muted ? muteAudio() : unMuteAudio()
}

function muteAudio() {
	muted = 1;
	var e = document.getElementById("muteButton"),
		n = document.getElementById("unMuteButton");
	e && (e.style.display = "none", n.style.display = "block")
}

function unMuteAudio() {
	muted = 0;
	var e = document.getElementById("muteButton"),
		n = document.getElementById("unMuteButton");
	e && (e.style.display = "block", n.style.display = "none")
}! function(e) {
	if ("object" == typeof exports && "object" == typeof module) module.exports = e();
	else {
		if ("function" == typeof define && define.amd) return define([], e);
		this.CodeMirror = e()
	}
}((function() {
	"use strict";
	var e = /gecko\/\d/i.test(navigator.userAgent),
		n = /MSIE \d/.test(navigator.userAgent),
		t = n && (null == document.documentMode || document.documentMode < 8),
		r = n && (null == document.documentMode || document.documentMode < 9),
		i = n && (null == document.documentMode || document.documentMode < 10),
		o = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent),
		a = n || o,
		l = /WebKit\//.test(navigator.userAgent),
		s = l && /Qt\/\d+\.\d+/.test(navigator.userAgent),
		c = /Chrome\//.test(navigator.userAgent),
		u = /Opera\//.test(navigator.userAgent),
		d = /Apple Computer/.test(navigator.vendor),
		h = /KHTML\//.test(navigator.userAgent),
		f = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
		p = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
		g = /PhantomJS/.test(navigator.userAgent),
		m = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
		v = m || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
		y = m || /Mac/.test(navigator.platform),
		b = /win/i.test(navigator.platform),
		w = u && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
	w && (w = Number(w[1])), w && w >= 15 && (u = !1, l = !0);
	var _ = y && (s || u && (null == w || w < 12.11)),
		C = e || a && !r,
		k = !1,
		x = !1;

	function S(e, t) {
		if (!(this instanceof S)) return new S(e, t);
		for (var i in this.options = t = t || {}, xt) t.hasOwnProperty(i) || (t[i] = xt[i]);
		P(t);
		var o = t.value;
		"string" == typeof o && (o = new Nr(o, t.mode)), this.doc = o;
		var l = this.display = new M(e, o);
		l.wrapper.CodeMirror = this, D(this), O(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), t.autofocus && !v && Ln(this), this.state = {
				keyMaps: [],
				overlays: [],
				modeGen: 0,
				overwrite: !1,
				focused: !1,
				suppressEdits: !1,
				pasteIncoming: !1,
				cutIncoming: !1,
				draggingText: !1,
				highlight: new Mi
			}, n && setTimeout(Pi(Tn, this, !0), 20),
			function(e) {
				var t, i = e.display;
				hi(i.scroller, "mousedown", gn(e, Nn)), hi(i.scroller, "dblclick", n ? gn(e, (function(n) {
					if (!yi(e, n)) {
						var t = Dn(e, n);
						if (t && !Pn(e, n) && !An(e.display, n)) {
							oi(n);
							var r = kt(e.doc, t);
							we(e.doc, r.anchor, r.head)
						}
					}
				})) : function(n) {
					yi(e, n) || oi(n)
				});
				hi(i.lineSpace, "selectstart", (function(e) {
					An(i, e) || oi(e)
				})), C || hi(i.scroller, "contextmenu", (function(n) {
					tt(e, n)
				}));

				function o() {
					e.state.focused && setTimeout(Pi(Ln, e), 0)
				}

				function l() {
					null == t && (t = setTimeout((function() {
						t = null, i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = $i = null, e.setSize()
					}), 100))
				}

				function s() {
					Ji(document.body, i.wrapper) ? setTimeout(s, 5e3) : fi(window, "resize", l)
				}

				function c(n) {
					yi(e, n) || si(n)
				}
				hi(i.scroller, "scroll", (function() {
					i.scroller.clientHeight && (Hn(e, i.scroller.scrollTop), zn(e, i.scroller.scrollLeft, !0), pi(e, "scroll", e))
				})), hi(i.scrollbarV, "scroll", (function() {
					i.scroller.clientHeight && Hn(e, i.scrollbarV.scrollTop)
				})), hi(i.scrollbarH, "scroll", (function() {
					i.scroller.clientHeight && zn(e, i.scrollbarH.scrollLeft)
				})), hi(i.scroller, "mousewheel", (function(n) {
					qn(e, n)
				})), hi(i.scroller, "DOMMouseScroll", (function(n) {
					qn(e, n)
				})), hi(i.scrollbarH, "mousedown", o), hi(i.scrollbarV, "mousedown", o), hi(i.wrapper, "scroll", (function() {
					i.wrapper.scrollTop = i.wrapper.scrollLeft = 0
				})), hi(window, "resize", l), setTimeout(s, 5e3), hi(i.input, "keyup", gn(e, Qn)), hi(i.input, "input", (function() {
					a && !r && e.display.inputHasSelection && (e.display.inputHasSelection = null), En(e)
				})), hi(i.input, "keydown", gn(e, $n)), hi(i.input, "keypress", gn(e, Zn)), hi(i.input, "focus", Pi(et, e)), hi(i.input, "blur", Pi(nt, e)), e.options.dragDrop && (hi(i.scroller, "dragstart", (function(t) {
					! function(e, t) {
						if (n && (!e.state.draggingText || +new Date - Fn < 100)) return void si(t);
						if (yi(e, t) || An(e.display, t)) return;
						if (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.setDragImage && !d) {
							var r = Gi("img", null, null, "position: fixed; left: 0; top: 0;");
							r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", u && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), u && r.parentNode.removeChild(r)
						}
					}(e, t)
				})), hi(i.scroller, "dragenter", c), hi(i.scroller, "dragover", c), hi(i.scroller, "drop", gn(e, jn)));

				function f(n) {
					i.inaccurateSelection && (i.prevInput = "", i.inaccurateSelection = !1, i.input.value = e.getSelection(), Oi(i.input)), "cut" == n.type && (e.state.cutIncoming = !0)
				}
				hi(i.scroller, "paste", (function(n) {
					An(i, n) || (e.state.pasteIncoming = !0, Ln(e), En(e))
				})), hi(i.input, "paste", (function() {
					e.state.pasteIncoming = !0, En(e)
				})), hi(i.input, "cut", f), hi(i.input, "copy", f), h && hi(i.sizer, "mouseup", (function() {
					Ki() == i.input && i.input.blur(), Ln(e)
				}))
			}(this);
		var s = this;
		pn(this, (function() {
			for (var e in s.curOp.forceUpdate = !0, jr(s, o), t.autofocus && !v || Ki() == l.input ? setTimeout(Pi(et, s), 20) : nt(s), St) St.hasOwnProperty(e) && St[e](s, t[e], Et);
			for (var n = 0; n < It.length; ++n) It[n](s)
		}))
	}

	function M(e, n) {
		var r = this,
			i = r.input = Gi("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
		l ? i.style.width = "1000px" : i.setAttribute("wrap", "off"), m && (i.style.border = "1px solid black"), i.setAttribute("autocorrect", "off"), i.setAttribute("autocapitalize", "off"), i.setAttribute("spellcheck", "false"), r.inputDiv = Gi("div", [i], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), r.scrollbarH = Gi("div", [Gi("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar"), r.scrollbarV = Gi("div", [Gi("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), r.scrollbarFiller = Gi("div", null, "CodeMirror-scrollbar-filler"), r.gutterFiller = Gi("div", null, "CodeMirror-gutter-filler"), r.lineDiv = Gi("div", null, "CodeMirror-code"), r.selectionDiv = Gi("div", null, null, "position: relative; z-index: 1"), r.cursorDiv = Gi("div", null, "CodeMirror-cursors"), r.measure = Gi("div", null, "CodeMirror-measure"), r.lineMeasure = Gi("div", null, "CodeMirror-measure"), r.lineSpace = Gi("div", [r.measure, r.lineMeasure, r.selectionDiv, r.cursorDiv, r.lineDiv], null, "position: relative; outline: none"), r.mover = Gi("div", [Gi("div", [r.lineSpace], "CodeMirror-lines")], null, "position: relative"), r.sizer = Gi("div", [r.mover], "CodeMirror-sizer"), r.heightForcer = Gi("div", null, null, "position: absolute; height: " + _i + "px; width: 1px;"), r.gutters = Gi("div", null, "CodeMirror-gutters"), r.lineGutter = null, r.scroller = Gi("div", [r.sizer, r.heightForcer, r.gutters], "CodeMirror-scroll"), r.scroller.setAttribute("tabIndex", "-1"), r.wrapper = Gi("div", [r.inputDiv, r.scrollbarH, r.scrollbarV, r.scrollbarFiller, r.gutterFiller, r.scroller], "CodeMirror"), t && (r.gutters.style.zIndex = -1, r.scroller.style.paddingRight = 0), m && (i.style.width = "0px"), l || (r.scroller.draggable = !0), h && (r.inputDiv.style.height = "1px", r.inputDiv.style.position = "absolute"), t && (r.scrollbarH.style.minHeight = r.scrollbarV.style.minWidth = "18px"), e.appendChild ? e.appendChild(r.wrapper) : e(r.wrapper), r.viewFrom = r.viewTo = n.first, r.view = [], r.externalMeasured = null, r.viewOffset = 0, r.lastSizeC = 0, r.updateLineNumbers = null, r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null, r.prevInput = "", r.alignWidgets = !1, r.pollingFast = !1, r.poll = new Mi, r.cachedCharWidth = r.cachedTextHeight = r.cachedPaddingH = null, r.inaccurateSelection = !1, r.maxLine = null, r.maxLineLength = 0, r.maxLineChanged = !1, r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null, r.shift = !1
	}

	function E(e) {
		e.doc.mode = S.getMode(e.options, e.doc.modeOption), R(e)
	}

	function R(e) {
		e.doc.iter((function(e) {
			e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
		})), e.doc.frontier = e.doc.first, Ne(e, 100), e.state.modeGen++, e.curOp && wn(e)
	}

	function T(e) {
		var n = ln(e.display),
			t = e.options.lineWrapping,
			r = t && Math.max(5, e.display.scroller.clientWidth / sn(e.display) - 3);
		return function(i) {
			if (ur(e.doc, i)) return 0;
			var o = 0;
			if (i.widgets)
				for (var a = 0; a < i.widgets.length; a++) i.widgets[a].height && (o += i.widgets[a].height);
			return t ? o + (Math.ceil(i.text.length / r) || 1) * n : o + n
		}
	}

	function L(e) {
		var n = e.doc,
			t = T(e);
		n.iter((function(e) {
			var n = t(e);
			n != e.height && Ur(e, n)
		}))
	}

	function I(e) {
		var n = Bt[e.options.keyMap].style;
		e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (n ? " cm-keymap-" + n : "")
	}

	function O(e) {
		e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), Je(e)
	}

	function A(e) {
		D(e), wn(e), setTimeout((function() {
			z(e)
		}), 20)
	}

	function D(e) {
		var n = e.display.gutters,
			t = e.options.gutters;
		Xi(n);
		for (var r = 0; r < t.length; ++r) {
			var i = t[r],
				o = n.appendChild(Gi("div", null, "CodeMirror-gutter " + i));
			"CodeMirror-linenumbers" == i && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px")
		}
		n.style.display = r ? "" : "none";
		var a = n.offsetWidth;
		e.display.sizer.style.marginLeft = a + "px", r && (e.display.scrollbarH.style.left = e.options.fixedGutter ? a + "px" : 0)
	}

	function N(e) {
		if (0 == e.height) return 0;
		for (var n, t = e.text.length, r = e; n = ir(r);) {
			r = (i = n.find(0, !0)).from.line, t += i.from.ch - i.to.ch
		}
		for (r = e; n = or(r);) {
			var i = n.find(0, !0);
			t -= r.text.length - i.from.ch, t += (r = i.to.line).text.length - i.to.ch
		}
		return t
	}

	function B(e) {
		var n = e.display,
			t = e.doc;
		n.maxLine = Hr(t, t.first), n.maxLineLength = N(n.maxLine), n.maxLineChanged = !0, t.iter((function(e) {
			var t = N(e);
			t > n.maxLineLength && (n.maxLineLength = t, n.maxLine = e)
		}))
	}

	function P(e) {
		var n = Ai(e.gutters, "CodeMirror-linenumbers"); - 1 == n && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : n > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(n, 1))
	}

	function F(e) {
		var n = e.display.scroller;
		return {
			clientHeight: n.clientHeight,
			barHeight: e.display.scrollbarV.clientHeight,
			scrollWidth: n.scrollWidth,
			clientWidth: n.clientWidth,
			barWidth: e.display.scrollbarH.clientWidth,
			docHeight: Math.round(e.doc.height + je(e.display))
		}
	}

	function j(e, n) {
		n || (n = F(e));
		var t = e.display,
			r = n.docHeight + _i,
			i = n.scrollWidth > n.clientWidth,
			o = r > n.clientHeight;
		if (o ? (t.scrollbarV.style.display = "block", t.scrollbarV.style.bottom = i ? no(t.measure) + "px" : "0", t.scrollbarV.firstChild.style.height = Math.max(0, r - n.clientHeight + (n.barHeight || t.scrollbarV.clientHeight)) + "px") : (t.scrollbarV.style.display = "", t.scrollbarV.firstChild.style.height = "0"), i ? (t.scrollbarH.style.display = "block", t.scrollbarH.style.right = o ? no(t.measure) + "px" : "0", t.scrollbarH.firstChild.style.width = n.scrollWidth - n.clientWidth + (n.barWidth || t.scrollbarH.clientWidth) + "px") : (t.scrollbarH.style.display = "", t.scrollbarH.firstChild.style.width = "0"), i && o ? (t.scrollbarFiller.style.display = "block", t.scrollbarFiller.style.height = t.scrollbarFiller.style.width = no(t.measure) + "px") : t.scrollbarFiller.style.display = "", i && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (t.gutterFiller.style.display = "block", t.gutterFiller.style.height = no(t.measure) + "px", t.gutterFiller.style.width = t.gutters.offsetWidth + "px") : t.gutterFiller.style.display = "", f && 0 === no(t.measure)) {
			t.scrollbarV.style.minWidth = t.scrollbarH.style.minHeight = p ? "18px" : "12px";
			var a = function(n) {
				ci(n) != t.scrollbarV && ci(n) != t.scrollbarH && gn(e, Nn)(n)
			};
			hi(t.scrollbarV, "mousedown", a), hi(t.scrollbarH, "mousedown", a)
		}
	}

	function H(e, n, t) {
		var r = t && null != t.top ? t.top : e.scroller.scrollTop;
		r = Math.floor(r - Fe(e));
		var i = t && null != t.bottom ? t.bottom : r + e.wrapper.clientHeight,
			o = qr(n, r),
			a = qr(n, i);
		if (t && t.ensure) {
			var l = t.ensure.from.line,
				s = t.ensure.to.line;
			if (l < o) return {
				from: l,
				to: qr(n, Gr(Hr(n, l)) + e.wrapper.clientHeight)
			};
			if (Math.min(s, n.lastLine()) >= a) return {
				from: qr(n, Gr(Hr(n, s)) - e.wrapper.clientHeight),
				to: s
			}
		}
		return {
			from: o,
			to: a
		}
	}

	function z(e) {
		var n = e.display,
			t = n.view;
		if (n.alignWidgets || n.gutters.firstChild && e.options.fixedGutter) {
			for (var r = U(n) - n.scroller.scrollLeft + e.doc.scrollLeft, i = n.gutters.offsetWidth, o = r + "px", a = 0; a < t.length; a++)
				if (!t[a].hidden) {
					e.options.fixedGutter && t[a].gutter && (t[a].gutter.style.left = o);
					var l = t[a].alignable;
					if (l)
						for (var s = 0; s < l.length; s++) l[s].style.left = o
				} e.options.fixedGutter && (n.gutters.style.left = r + i + "px")
		}
	}

	function W(e, n) {
		return String(e.lineNumberFormatter(n + e.firstLineNumber))
	}

	function U(e) {
		return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
	}

	function V(e, n, t) {
		for (var r, i = e.display.viewFrom, o = e.display.viewTo, a = H(e.display, e.doc, n), l = !0;; l = !1) {
			var s = e.display.scroller.clientWidth;
			if (!q(e, a, t)) break;
			r = !0, e.display.maxLineChanged && !e.options.lineWrapping && G(e);
			var c = F(e);
			if (Ie(e), X(e, c), j(e, c), l && e.options.lineWrapping && s != e.display.scroller.clientWidth) t = !0;
			else if (t = !1, n && null != n.top && (n = {
					top: Math.min(c.docHeight - _i - c.clientHeight, n.top)
				}), (a = H(e.display, e.doc, n)).from >= e.display.viewFrom && a.to <= e.display.viewTo) break
		}
		return e.display.updateLineNumbers = null, r && (mi(e, "update", e), e.display.viewFrom == i && e.display.viewTo == o || mi(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo)), r
	}

	function q(e, n, r) {
		var i = e.display,
			o = e.doc;
		if (i.wrapper.offsetWidth) {
			if (!(!r && n.from >= i.viewFrom && n.to <= i.viewTo && 0 == Sn(e))) {
				(function(e) {
					if (!e.options.lineNumbers) return !1;
					var n = e.doc,
						t = W(e.options, n.first + n.size - 1),
						r = e.display;
					if (t.length != r.lineNumChars) {
						var i = r.measure.appendChild(Gi("div", [Gi("div", t)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
							o = i.firstChild.offsetWidth,
							a = i.offsetWidth - o;
						r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - a), r.lineNumWidth = r.lineNumInnerWidth + a, r.lineNumChars = r.lineNumInnerWidth ? t.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px";
						var l = r.gutters.offsetWidth;
						return r.scrollbarH.style.left = e.options.fixedGutter ? l + "px" : 0, r.sizer.style.marginLeft = l + "px", !0
					}
					return !1
				})(e) && Cn(e);
				var a = J(e),
					s = o.first + o.size,
					c = Math.max(n.from - e.options.viewportMargin, o.first),
					u = Math.min(s, n.to + e.options.viewportMargin);
				i.viewFrom < c && c - i.viewFrom < 20 && (c = Math.max(o.first, i.viewFrom)), i.viewTo > u && i.viewTo - u < 20 && (u = Math.min(s, i.viewTo)), x && (c = sr(e.doc, c), u = cr(e.doc, u));
				var d = c != i.viewFrom || u != i.viewTo || i.lastSizeC != i.wrapper.clientHeight;
				! function(e, n, t) {
					var r = e.display,
						i = r.view;
					0 == i.length || n >= r.viewTo || t <= r.viewFrom ? (r.view = bn(e, n, t), r.viewFrom = n) : (r.viewFrom > n ? r.view = bn(e, n, r.viewFrom).concat(r.view) : r.viewFrom < n && (r.view = r.view.slice(kn(e, n))), r.viewFrom = n, r.viewTo < t ? r.view = r.view.concat(bn(e, r.viewTo, t)) : r.viewTo > t && (r.view = r.view.slice(0, kn(e, t))));
					r.viewTo = t
				}(e, c, u), i.viewOffset = Gr(Hr(e.doc, i.viewFrom)), e.display.mover.style.top = i.viewOffset + "px";
				var h = Sn(e);
				if (d || 0 != h || r) {
					var f = Ki();
					return h > 4 && (i.lineDiv.style.display = "none"),
						function(e, n, t) {
							var r = e.display,
								i = e.options.lineNumbers,
								o = r.lineDiv,
								a = o.firstChild;

							function s(n) {
								var t = n.nextSibling;
								return l && y && e.display.currentWheelTarget == n ? n.style.display = "none" : n.parentNode.removeChild(n), t
							}
							for (var c = r.view, u = r.viewFrom, d = 0; d < c.length; d++) {
								var h = c[d];
								if (h.hidden);
								else if (h.node) {
									for (; a != h.node;) a = s(a);
									var f = i && null != n && n <= u && h.lineNumber;
									h.changes && (Ai(h.changes, "gutter") > -1 && (f = !1), K(e, h, u, t)), f && (Xi(h.lineNumber), h.lineNumber.appendChild(document.createTextNode(W(e.options, u)))), a = h.node.nextSibling
								} else {
									var p = re(e, h, u, t);
									o.insertBefore(p, a)
								}
								u += h.size
							}
							for (; a;) a = s(a)
						}(e, i.updateLineNumbers, a), h > 4 && (i.lineDiv.style.display = ""), f && Ki() != f && f.offsetHeight && f.focus(), Xi(i.cursorDiv), Xi(i.selectionDiv), d && (i.lastSizeC = i.wrapper.clientHeight, Ne(e, 400)),
						function(e) {
							for (var n = e.display, r = n.lineDiv.offsetTop, i = 0; i < n.view.length; i++) {
								var o, a = n.view[i];
								if (!a.hidden) {
									if (t) {
										var l = a.node.offsetTop + a.node.offsetHeight;
										o = l - r, r = l
									} else {
										var s = a.node.getBoundingClientRect();
										o = s.bottom - s.top
									}
									var c = a.line.height - o;
									if (o < 2 && (o = ln(n)), (c > .001 || c < -.001) && (Ur(a.line, o), Y(a.line), a.rest))
										for (var u = 0; u < a.rest.length; u++) Y(a.rest[u])
								}
							}
						}(e), !0
				}
			}
		} else Cn(e)
	}

	function G(e) {
		var n = e.display,
			t = ze(e, n.maxLine, n.maxLine.text.length).left;
		n.maxLineChanged = !1;
		var r = Math.max(0, t + 3),
			i = Math.max(0, n.sizer.offsetLeft + r + _i - n.scroller.clientWidth);
		n.sizer.style.minWidth = r + "px", i < e.doc.scrollLeft && zn(e, Math.min(n.scroller.scrollLeft, i), !0)
	}

	function X(e, n) {
		e.display.sizer.style.minHeight = e.display.heightForcer.style.top = n.docHeight + "px", e.display.gutters.style.height = Math.max(n.docHeight, n.clientHeight - _i) + "px"
	}

	function Y(e) {
		if (e.widgets)
			for (var n = 0; n < e.widgets.length; ++n) e.widgets[n].height = e.widgets[n].node.offsetHeight
	}

	function J(e) {
		for (var n = e.display, t = {}, r = {}, i = n.gutters.firstChild, o = 0; i; i = i.nextSibling, ++o) t[e.options.gutters[o]] = i.offsetLeft, r[e.options.gutters[o]] = i.offsetWidth;
		return {
			fixedPos: U(n),
			gutterTotalWidth: n.gutters.offsetWidth,
			gutterLeft: t,
			gutterWidth: r,
			wrapperWidth: n.wrapper.clientWidth
		}
	}

	function K(e, n, t, r) {
		for (var i = 0; i < n.changes.length; i++) {
			var o = n.changes[i];
			"text" == o ? Z(e, n) : "gutter" == o ? ne(e, n, t, r) : "class" == o ? ee(n) : "widget" == o && te(n, r)
		}
		n.changes = null
	}

	function $(e) {
		return e.node == e.text && (e.node = Gi("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), t && (e.node.style.zIndex = 2)), e.node
	}

	function Q(e, n) {
		var t = e.display.externalMeasured;
		return t && t.line == n.line ? (e.display.externalMeasured = null, n.measure = t.measure, t.built) : xr(e, n)
	}

	function Z(e, n) {
		var t = n.text.className,
			r = Q(e, n);
		n.text == n.node && (n.node = r.pre), n.text.parentNode.replaceChild(r.pre, n.text), n.text = r.pre, r.bgClass != n.bgClass || r.textClass != n.textClass ? (n.bgClass = r.bgClass, n.textClass = r.textClass, ee(n)) : t && (n.text.className = t)
	}

	function ee(e) {
		! function(e) {
			var n = e.bgClass ? e.bgClass + " " + (e.line.bgClass || "") : e.line.bgClass;
			if (n && (n += " CodeMirror-linebackground"), e.background) n ? e.background.className = n : (e.background.parentNode.removeChild(e.background), e.background = null);
			else if (n) {
				var t = $(e);
				e.background = t.insertBefore(Gi("div", null, n), t.firstChild)
			}
		}(e), e.line.wrapClass ? $(e).className = e.line.wrapClass : e.node != e.text && (e.node.className = "");
		var n = e.textClass ? e.textClass + " " + (e.line.textClass || "") : e.line.textClass;
		e.text.className = n || ""
	}

	function ne(e, n, t, r) {
		n.gutter && (n.node.removeChild(n.gutter), n.gutter = null);
		var i = n.line.gutterMarkers;
		if (e.options.lineNumbers || i) {
			var o = $(n),
				a = n.gutter = o.insertBefore(Gi("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px"), n.text);
			if (!e.options.lineNumbers || i && i["CodeMirror-linenumbers"] || (n.lineNumber = a.appendChild(Gi("div", W(e.options, t), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), i)
				for (var l = 0; l < e.options.gutters.length; ++l) {
					var s = e.options.gutters[l],
						c = i.hasOwnProperty(s) && i[s];
					c && a.appendChild(Gi("div", [c], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[s] + "px; width: " + r.gutterWidth[s] + "px"))
				}
		}
	}

	function te(e, n) {
		e.alignable && (e.alignable = null);
		for (var t = e.node.firstChild; t; t = r) {
			var r = t.nextSibling;
			"CodeMirror-linewidget" == t.className && e.node.removeChild(t)
		}
		ie(e, n)
	}

	function re(e, n, t, r) {
		var i = Q(e, n);
		return n.text = n.node = i.pre, i.bgClass && (n.bgClass = i.bgClass), i.textClass && (n.textClass = i.textClass), ee(n), ne(e, n, t, r), ie(n, r), n.node
	}

	function ie(e, n) {
		if (oe(e.line, e, n, !0), e.rest)
			for (var t = 0; t < e.rest.length; t++) oe(e.rest[t], e, n, !1)
	}

	function oe(e, n, t, r) {
		if (e.widgets)
			for (var i = $(n), o = 0, a = e.widgets; o < a.length; ++o) {
				var l = a[o],
					s = Gi("div", [l.node], "CodeMirror-linewidget");
				l.handleMouseEvents || (s.ignoreEvents = !0), ae(l, s, n, t), r && l.above ? i.insertBefore(s, n.gutter || n.text) : i.appendChild(s), mi(l, "redraw")
			}
	}

	function ae(e, n, t, r) {
		if (e.noHScroll) {
			(t.alignable || (t.alignable = [])).push(n);
			var i = r.wrapperWidth;
			n.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, n.style.paddingLeft = r.gutterTotalWidth + "px"), n.style.width = i + "px"
		}
		e.coverGutter && (n.style.zIndex = 5, n.style.position = "relative", e.noHScroll || (n.style.marginLeft = -r.gutterTotalWidth + "px"))
	}
	var le = S.Pos = function(e, n) {
			if (!(this instanceof le)) return new le(e, n);
			this.line = e, this.ch = n
		},
		se = S.cmpPos = function(e, n) {
			return e.line - n.line || e.ch - n.ch
		};

	function ce(e) {
		return le(e.line, e.ch)
	}

	function ue(e, n) {
		return se(e, n) < 0 ? n : e
	}

	function de(e, n) {
		return se(e, n) < 0 ? e : n
	}

	function he(e, n) {
		this.ranges = e, this.primIndex = n
	}

	function fe(e, n) {
		this.anchor = e, this.head = n
	}

	function pe(e, n) {
		var t = e[n];
		e.sort((function(e, n) {
			return se(e.from(), n.from())
		})), n = Ai(e, t);
		for (var r = 1; r < e.length; r++) {
			var i = e[r],
				o = e[r - 1];
			if (se(o.to(), i.from()) >= 0) {
				var a = de(o.from(), i.from()),
					l = ue(o.to(), i.to()),
					s = o.empty() ? i.from() == i.head : o.from() == o.head;
				r <= n && --n, e.splice(--r, 2, new fe(s ? l : a, s ? a : l))
			}
		}
		return new he(e, n)
	}

	function ge(e, n) {
		return new he([new fe(e, n || e)], 0)
	}

	function me(e, n) {
		return Math.max(e.first, Math.min(n, e.first + e.size - 1))
	}

	function ve(e, n) {
		if (n.line < e.first) return le(e.first, 0);
		var t = e.first + e.size - 1;
		return n.line > t ? le(t, Hr(e, t).text.length) : function(e, n) {
			var t = e.ch;
			return null == t || t > n ? le(e.line, n) : t < 0 ? le(e.line, 0) : e
		}(n, Hr(e, n.line).text.length)
	}

	function ye(e, n) {
		return n >= e.first && n < e.first + e.size
	}

	function be(e, n, t, r) {
		if (e.cm && e.cm.display.shift || e.extend) {
			var i = n.anchor;
			if (r) {
				var o = se(t, i) < 0;
				o != se(r, i) < 0 ? (i = t, t = r) : o != se(t, r) < 0 && (t = r)
			}
			return new fe(i, t)
		}
		return new fe(r || t, t)
	}

	function we(e, n, t, r) {
		Se(e, new he([be(e, e.sel.primary(), n, t)], 0), r)
	}

	function _e(e, n, t) {
		for (var r = [], i = 0; i < e.sel.ranges.length; i++) r[i] = be(e, e.sel.ranges[i], n[i], null);
		Se(e, pe(r, e.sel.primIndex), t)
	}

	function Ce(e, n, t, r) {
		var i = e.sel.ranges.slice(0);
		i[n] = t, Se(e, pe(i, e.sel.primIndex), r)
	}

	function ke(e, n, t, r) {
		Se(e, ge(n, t), r)
	}

	function xe(e, n, t) {
		var r = e.history.done,
			i = Ii(r);
		i && i.ranges ? (r[r.length - 1] = n, Me(e, n, t)) : Se(e, n, t)
	}

	function Se(e, n, t) {
		Me(e, n, t),
			function(e, n, t, r) {
				var i = e.history,
					o = r && r.origin;
				t == i.lastOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || function(e, n, t, r) {
					var i = n.charAt(0);
					return "*" == i || "+" == i && t.ranges.length == r.ranges.length && t.somethingSelected() == r.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
				}(e, o, Ii(i.done), n)) ? i.done[i.done.length - 1] = n : Qr(n, i.done);
				i.lastSelTime = +new Date, i.lastSelOrigin = o, i.lastOp = t, r && !1 !== r.clearRedo && Kr(i.undone)
			}(e, e.sel, e.cm ? e.cm.curOp.id : NaN, t)
	}

	function Me(e, n, t) {
		(bi(e, "beforeSelectionChange") || e.cm && bi(e.cm, "beforeSelectionChange")) && (n = function(e, n) {
			var t = {
				ranges: n.ranges,
				update: function(n) {
					this.ranges = [];
					for (var t = 0; t < n.length; t++) this.ranges[t] = new fe(ve(e, n[t].anchor), ve(e, n[t].head))
				}
			};
			return pi(e, "beforeSelectionChange", e, t), e.cm && pi(e.cm, "beforeSelectionChange", e.cm, t), t.ranges != n.ranges ? pe(t.ranges, t.ranges.length - 1) : n
		}(e, n));
		var r = se(n.primary().head, e.sel.primary().head) < 0 ? -1 : 1;
		Ee(e, Te(e, n, r, !0)), t && !1 === t.scroll || !e.cm || mt(e.cm)
	}

	function Ee(e, n) {
		n.equals(e.sel) || (e.sel = n, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = e.cm.curOp.cursorActivity = !0), mi(e, "cursorActivity", e))
	}

	function Re(e) {
		Ee(e, Te(e, e.sel, null, !1))
	}

	function Te(e, n, t, r) {
		for (var i, o = 0; o < n.ranges.length; o++) {
			var a = n.ranges[o],
				l = Le(e, a.anchor, t, r),
				s = Le(e, a.head, t, r);
			(i || l != a.anchor || s != a.head) && (i || (i = n.ranges.slice(0, o)), i[o] = new fe(l, s))
		}
		return i ? pe(i, n.primIndex) : n
	}

	function Le(e, n, t, r) {
		var i = !1,
			o = n,
			a = t || 1;
		e.cantEdit = !1;
		e: for (;;) {
			var l = Hr(e, o.line);
			if (l.markedSpans)
				for (var s = 0; s < l.markedSpans.length; ++s) {
					var c = l.markedSpans[s],
						u = c.marker;
					if ((null == c.from || (u.inclusiveLeft ? c.from <= o.ch : c.from < o.ch)) && (null == c.to || (u.inclusiveRight ? c.to >= o.ch : c.to > o.ch))) {
						if (r && (pi(u, "beforeCursorEnter"), u.explicitlyCleared)) {
							if (l.markedSpans) {
								--s;
								continue
							}
							break
						}
						if (!u.atomic) continue;
						var d = u.find(a < 0 ? -1 : 1);
						if (0 == se(d, o) && (d.ch += a, d.ch < 0 ? d = d.line > e.first ? ve(e, le(d.line - 1)) : null : d.ch > l.text.length && (d = d.line < e.first + e.size - 1 ? le(d.line + 1, 0) : null), !d)) {
							if (i) return r ? (e.cantEdit = !0, le(e.first, 0)) : Le(e, n, t, !0);
							i = !0, d = n, a = -a
						}
						o = d;
						continue e
					}
				}
			return o
		}
	}

	function Ie(e) {
		for (var n = e.display, t = e.doc, r = document.createDocumentFragment(), i = document.createDocumentFragment(), o = 0; o < t.sel.ranges.length; o++) {
			var a = t.sel.ranges[o],
				l = a.empty();
			(l || e.options.showCursorWhenSelecting) && Oe(e, a, r), l || Ae(e, a, i)
		}
		if (e.options.moveInputWithCursor) {
			var s = nn(e, t.sel.primary().head, "div"),
				c = n.wrapper.getBoundingClientRect(),
				u = n.lineDiv.getBoundingClientRect(),
				d = Math.max(0, Math.min(n.wrapper.clientHeight - 10, s.top + u.top - c.top)),
				h = Math.max(0, Math.min(n.wrapper.clientWidth - 10, s.left + u.left - c.left));
			n.inputDiv.style.top = d + "px", n.inputDiv.style.left = h + "px"
		}
		Yi(n.cursorDiv, r), Yi(n.selectionDiv, i)
	}

	function Oe(e, n, t) {
		var r = nn(e, n.head, "div"),
			i = t.appendChild(Gi("div", " ", "CodeMirror-cursor"));
		if (i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", r.other) {
			var o = t.appendChild(Gi("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
			o.style.display = "", o.style.left = r.other.left + "px", o.style.top = r.other.top + "px", o.style.height = .85 * (r.other.bottom - r.other.top) + "px"
		}
	}

	function Ae(e, n, t) {
		var r = e.display,
			i = e.doc,
			o = document.createDocumentFragment(),
			a = He(e.display),
			l = a.left,
			s = r.lineSpace.offsetWidth - a.right;

		function c(e, n, t, r) {
			n < 0 && (n = 0), o.appendChild(Gi("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + n + "px; width: " + (null == t ? s - e : t) + "px; height: " + (r - n) + "px"))
		}

		function u(n, t, r) {
			var o, a, u = Hr(i, n),
				d = u.text.length;

			function h(t, r) {
				return en(e, le(n, t), "div", u, r)
			}
			return function(e, n, t, r) {
				if (!e) return r(n, t, "ltr");
				for (var i = !1, o = 0; o < e.length; ++o) {
					var a = e[o];
					(a.from < t && a.to > n || n == t && a.to == n) && (r(Math.max(a.from, n), Math.min(a.to, t), 1 == a.level ? "rtl" : "ltr"), i = !0)
				}
				i || r(n, t, "ltr")
			}(Xr(u), t || 0, null == r ? d : r, (function(e, n, i) {
				var u, f, p, g = h(e, "left");
				if (e == n) u = g, f = p = g.left;
				else {
					if (u = h(n - 1, "right"), "rtl" == i) {
						var m = g;
						g = u, u = m
					}
					f = g.left, p = u.right
				}
				null == t && 0 == e && (f = l), u.top - g.top > 3 && (c(f, g.top, null, g.bottom), f = l, g.bottom < u.top && c(f, g.bottom, null, u.top)), null == r && n == d && (p = s), (!o || g.top < o.top || g.top == o.top && g.left < o.left) && (o = g), (!a || u.bottom > a.bottom || u.bottom == a.bottom && u.right > a.right) && (a = u), f < l + 1 && (f = l), c(f, u.top, p - f, u.bottom)
			})), {
				start: o,
				end: a
			}
		}
		var d = n.from(),
			h = n.to();
		if (d.line == h.line) u(d.line, d.ch, h.ch);
		else {
			var f = Hr(i, d.line),
				p = Hr(i, h.line),
				g = lr(f) == lr(p),
				m = u(d.line, d.ch, g ? f.text.length + 1 : null).end,
				v = u(h.line, g ? 0 : null, h.ch).start;
			g && (m.top < v.top - 2 ? (c(m.right, m.top, null, m.bottom), c(l, v.top, v.left, v.bottom)) : c(m.right, m.top, v.left - m.right, m.bottom)), m.bottom < v.top && c(l, m.bottom, null, v.top)
		}
		t.appendChild(o)
	}

	function De(e) {
		if (e.state.focused) {
			var n = e.display;
			clearInterval(n.blinker);
			var t = !0;
			n.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 && (n.blinker = setInterval((function() {
				n.cursorDiv.style.visibility = (t = !t) ? "" : "hidden"
			}), e.options.cursorBlinkRate))
		}
	}

	function Ne(e, n) {
		e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(n, Pi(Be, e))
	}

	function Be(e) {
		var n = e.doc;
		if (n.frontier < n.first && (n.frontier = n.first), !(n.frontier >= e.display.viewTo)) {
			var t = +new Date + e.options.workTime,
				r = At(n.mode, Pe(e, n.frontier));
			pn(e, (function() {
				n.iter(n.frontier, Math.min(n.first + n.size, e.display.viewTo + 500), (function(i) {
					if (n.frontier >= e.display.viewFrom) {
						var o = i.styles;
						i.styles = yr(e, i, r, !0);
						for (var a = !o || o.length != i.styles.length, l = 0; !a && l < o.length; ++l) a = o[l] != i.styles[l];
						a && _n(e, n.frontier, "text"), i.stateAfter = At(n.mode, r)
					} else wr(e, i.text, r), i.stateAfter = n.frontier % 5 == 0 ? At(n.mode, r) : null;
					if (++n.frontier, +new Date > t) return Ne(e, e.options.workDelay), !0
				}))
			}))
		}
	}

	function Pe(e, n, t) {
		var r = e.doc,
			i = e.display;
		if (!r.mode.startState) return !0;
		var o = function(e, n, t) {
				for (var r, i, o = e.doc, a = t ? -1 : n - (e.doc.mode.innerMode ? 1e3 : 100), l = n; l > a; --l) {
					if (l <= o.first) return o.first;
					var s = Hr(o, l - 1);
					if (s.stateAfter && (!t || l <= o.frontier)) return l;
					var c = Ei(s.text, null, e.options.tabSize);
					(null == i || r > c) && (i = l - 1, r = c)
				}
				return i
			}(e, n, t),
			a = o > r.first && Hr(r, o - 1).stateAfter;
		return a = a ? At(r.mode, a) : Dt(r.mode), r.iter(o, n, (function(t) {
			wr(e, t.text, a);
			var l = o == n - 1 || o % 5 == 0 || o >= i.viewFrom && o < i.viewTo;
			t.stateAfter = l ? At(r.mode, a) : null, ++o
		})), t && (r.frontier = o), a
	}

	function Fe(e) {
		return e.lineSpace.offsetTop
	}

	function je(e) {
		return e.mover.offsetHeight - e.lineSpace.offsetHeight
	}

	function He(e) {
		if (e.cachedPaddingH) return e.cachedPaddingH;
		var n = Yi(e.measure, Gi("pre", "x")),
			t = window.getComputedStyle ? window.getComputedStyle(n) : n.currentStyle;
		return e.cachedPaddingH = {
			left: parseInt(t.paddingLeft),
			right: parseInt(t.paddingRight)
		}
	}

	function ze(e, n, t, r) {
		return Ve(e, Ue(e, n), t, r)
	}

	function We(e, n) {
		if (n >= e.display.viewFrom && n < e.display.viewTo) return e.display.view[kn(e, n)];
		var t = e.display.externalMeasured;
		return t && n >= t.lineN && n < t.lineN + t.size ? t : void 0
	}

	function Ue(e, n) {
		var t = Vr(n),
			r = We(e, t);
		r && !r.text ? r = null : r && r.changes && K(e, r, t, J(e)), r || (r = function(e, n) {
			var t = Vr(n = lr(n)),
				r = e.display.externalMeasured = new yn(e.doc, n, t);
			r.lineN = t;
			var i = r.built = xr(e, r);
			return r.text = i.pre, Yi(e.display.lineMeasure, i.pre), r
		}(e, n));
		var i = function(e, n, t) {
			if (e.line == n) return {
				map: e.measure.map,
				cache: e.measure.cache
			};
			for (var r = 0; r < e.rest.length; r++)
				if (e.rest[r] == n) return {
					map: e.measure.maps[r],
					cache: e.measure.caches[r]
				};
			for (r = 0; r < e.rest.length; r++)
				if (Vr(e.rest[r]) > t) return {
					map: e.measure.maps[r],
					cache: e.measure.caches[r],
					before: !0
				}
		}(r, n, t);
		return {
			line: n,
			view: r,
			rect: null,
			map: i.map,
			cache: i.cache,
			before: i.before,
			hasHeights: !1
		}
	}

	function Ve(e, n, t, i) {
		n.before && (t = -1);
		var o, l = t + (i || "");
		return n.cache.hasOwnProperty(l) ? o = n.cache[l] : (n.rect || (n.rect = n.view.text.getBoundingClientRect()), n.hasHeights || (! function(e, n, t) {
			var r = e.options.lineWrapping,
				i = r && e.display.scroller.clientWidth;
			if (!n.measure.heights || r && n.measure.width != i) {
				var o = n.measure.heights = [];
				if (r) {
					n.measure.width = i;
					for (var a = n.text.firstChild.getClientRects(), l = 0; l < a.length - 1; l++) {
						var s = a[l],
							c = a[l + 1];
						Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - t.top)
					}
				}
				o.push(t.bottom - t.top)
			}
		}(e, n.view, n.rect), n.hasHeights = !0), o = function(e, n, t, i) {
			for (var o, l, s, c, u, d = n.map, h = 0; h < d.length; h += 3) {
				var f = d[h],
					p = d[h + 1];
				if (t < f ? (l = 0, s = 1, c = "left") : t < p ? s = (l = t - f) + 1 : (h == d.length - 3 || t == p && d[h + 3] > t) && (l = (s = p - f) - 1, t >= p && (c = "right")), null != l) {
					if (o = d[h + 2], f == p && i == (o.insertLeft ? "left" : "right") && (c = i), "left" == i && 0 == l)
						for (; h && d[h - 2] == d[h - 3] && d[h - 1].insertLeft;) o = d[2 + (h -= 3)], c = "left";
					if ("right" == i && l == p - f)
						for (; h < d.length - 3 && d[h + 3] == d[h + 4] && !d[h + 5].insertLeft;) o = d[(h += 3) + 2], c = "right";
					break
				}
			}
			if (3 == o.nodeType) {
				for (; l && Wi(n.line.text.charAt(f + l));) --l;
				for (; f + s < p && Wi(n.line.text.charAt(f + s));) ++s;
				if (r && 0 == l && s == p - f) u = o.parentNode.getBoundingClientRect();
				else if (a && e.options.lineWrapping) {
					u = (g = Ui(o, l, s).getClientRects()).length ? g["right" == i ? g.length - 1 : 0] : Ge
				} else u = Ui(o, l, s).getBoundingClientRect()
			} else {
				var g;
				l > 0 && (c = i = "right"), u = e.options.lineWrapping && (g = o.getClientRects()).length > 1 ? g["right" == i ? g.length - 1 : 0] : o.getBoundingClientRect()
			}
			if (r && !l && (!u || !u.left && !u.right)) {
				var m = o.parentNode.getClientRects()[0];
				u = m ? {
					left: m.left,
					right: m.left + sn(e.display),
					top: m.top,
					bottom: m.bottom
				} : Ge
			}
			var v, y = (u.bottom + u.top) / 2 - n.rect.top,
				b = n.view.measure.heights;
			for (h = 0; h < b.length - 1 && !(y < b[h]); h++);
			v = h ? b[h - 1] : 0, y = b[h];
			var w = {
				left: ("right" == c ? u.right : u.left) - n.rect.left,
				right: ("left" == c ? u.left : u.right) - n.rect.left,
				top: v,
				bottom: y
			};
			u.left || u.right || (w.bogus = !0);
			return w
		}(e, n, t, i), o.bogus || (n.cache[l] = o)), {
			left: o.left,
			right: o.right,
			top: o.top,
			bottom: o.bottom
		}
	}
	he.prototype = {
		primary: function() {
			return this.ranges[this.primIndex]
		},
		equals: function(e) {
			if (e == this) return !0;
			if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
			for (var n = 0; n < this.ranges.length; n++) {
				var t = this.ranges[n],
					r = e.ranges[n];
				if (0 != se(t.anchor, r.anchor) || 0 != se(t.head, r.head)) return !1
			}
			return !0
		},
		deepCopy: function() {
			for (var e = [], n = 0; n < this.ranges.length; n++) e[n] = new fe(ce(this.ranges[n].anchor), ce(this.ranges[n].head));
			return new he(e, this.primIndex)
		},
		somethingSelected: function() {
			for (var e = 0; e < this.ranges.length; e++)
				if (!this.ranges[e].empty()) return !0;
			return !1
		},
		contains: function(e, n) {
			n || (n = e);
			for (var t = 0; t < this.ranges.length; t++) {
				var r = this.ranges[t];
				if (se(n, r.from()) >= 0 && se(e, r.to()) <= 0) return t
			}
			return -1
		}
	}, fe.prototype = {
		from: function() {
			return de(this.anchor, this.head)
		},
		to: function() {
			return ue(this.anchor, this.head)
		},
		empty: function() {
			return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
		}
	};
	var qe, Ge = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	};

	function Xe(e) {
		if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
			for (var n = 0; n < e.rest.length; n++) e.measure.caches[n] = {}
	}

	function Ye(e) {
		e.display.externalMeasure = null, Xi(e.display.lineMeasure);
		for (var n = 0; n < e.display.view.length; n++) Xe(e.display.view[n])
	}

	function Je(e) {
		Ye(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
	}

	function Ke() {
		return window.pageXOffset || (document.documentElement || document.body).scrollLeft
	}

	function $e() {
		return window.pageYOffset || (document.documentElement || document.body).scrollTop
	}

	function Qe(e, n, t, r) {
		if (n.widgets)
			for (var i = 0; i < n.widgets.length; ++i)
				if (n.widgets[i].above) {
					var o = pr(n.widgets[i]);
					t.top += o, t.bottom += o
				} if ("line" == r) return t;
		r || (r = "local");
		var a = Gr(n);
		if ("local" == r ? a += Fe(e.display) : a -= e.display.viewOffset, "page" == r || "window" == r) {
			var l = e.display.lineSpace.getBoundingClientRect();
			a += l.top + ("window" == r ? 0 : $e());
			var s = l.left + ("window" == r ? 0 : Ke());
			t.left += s, t.right += s
		}
		return t.top += a, t.bottom += a, t
	}

	function Ze(e, n, t) {
		if ("div" == t) return n;
		var r = n.left,
			i = n.top;
		if ("page" == t) r -= Ke(), i -= $e();
		else if ("local" == t || !t) {
			var o = e.display.sizer.getBoundingClientRect();
			r += o.left, i += o.top
		}
		var a = e.display.lineSpace.getBoundingClientRect();
		return {
			left: r - a.left,
			top: i - a.top
		}
	}

	function en(e, n, t, r, i) {
		return r || (r = Hr(e.doc, n.line)), Qe(e, r, ze(e, r, n.ch, i), t)
	}

	function nn(e, n, t, r, i) {
		function o(n, o) {
			var a = Ve(e, i, n, o ? "right" : "left");
			return o ? a.left = a.right : a.right = a.left, Qe(e, r, a, t)
		}

		function a(e, n) {
			var t = l[n],
				r = t.level % 2;
			return e == uo(t) && n && t.level < l[n - 1].level ? (e = ho(t = l[--n]) - (t.level % 2 ? 0 : 1), r = !0) : e == ho(t) && n < l.length - 1 && t.level < l[n + 1].level && (e = uo(t = l[++n]) - t.level % 2, r = !1), r && e == t.to && e > t.from ? o(e - 1) : o(e, r)
		}
		r = r || Hr(e.doc, n.line), i || (i = Ue(e, r));
		var l = Xr(r),
			s = n.ch;
		if (!l) return o(s);
		var c = a(s, vo(l, s));
		return null != oo && (c.other = a(s, oo)), c
	}

	function tn(e, n) {
		var t = 0;
		n = ve(e.doc, n);
		e.options.lineWrapping || (t = sn(e.display) * n.ch);
		var r = Hr(e.doc, n.line),
			i = Gr(r) + Fe(e.display);
		return {
			left: t,
			right: t,
			top: i,
			bottom: i + r.height
		}
	}

	function rn(e, n, t, r) {
		var i = le(e, n);
		return i.xRel = r, t && (i.outside = !0), i
	}

	function on(e, n, t) {
		var r = e.doc;
		if ((t += e.display.viewOffset) < 0) return rn(r.first, 0, !0, -1);
		var i = qr(r, t),
			o = r.first + r.size - 1;
		if (i > o) return rn(r.first + r.size - 1, Hr(r, o).text.length, !0, 1);
		n < 0 && (n = 0);
		for (var a = Hr(r, i);;) {
			var l = an(e, a, i, n, t),
				s = or(a),
				c = s && s.find(0, !0);
			if (!s || !(l.ch > c.from.ch || l.ch == c.from.ch && l.xRel > 0)) return l;
			i = Vr(a = c.to.line)
		}
	}

	function an(e, n, t, r, i) {
		var o = i - Gr(n),
			a = !1,
			l = 2 * e.display.wrapper.clientWidth,
			s = Ue(e, n);

		function c(r) {
			var i = nn(e, le(t, r), "line", n, s);
			return a = !0, o > i.bottom ? i.left - l : o < i.top ? i.left + l : (a = !1, i.left)
		}
		var u = Xr(n),
			d = n.text.length,
			h = fo(n),
			f = po(n),
			p = c(h),
			g = a,
			m = c(f),
			v = a;
		if (r > m) return rn(t, f, v, 1);
		for (;;) {
			if (u ? f == h || f == bo(n, h, 1) : f - h <= 1) {
				for (var y = r < p || r - p <= m - r ? h : f, b = r - (y == h ? p : m); Wi(n.text.charAt(y));) ++y;
				return rn(t, y, y == h ? g : v, b < -1 ? -1 : b > 1 ? 1 : 0)
			}
			var w = Math.ceil(d / 2),
				_ = h + w;
			if (u) {
				_ = h;
				for (var C = 0; C < w; ++C) _ = bo(n, _, 1)
			}
			var k = c(_);
			k > r ? (f = _, m = k, (v = a) && (m += 1e3), d = w) : (h = _, p = k, g = a, d -= w)
		}
	}

	function ln(e) {
		if (null != e.cachedTextHeight) return e.cachedTextHeight;
		if (null == qe) {
			qe = Gi("pre");
			for (var n = 0; n < 49; ++n) qe.appendChild(document.createTextNode("x")), qe.appendChild(Gi("br"));
			qe.appendChild(document.createTextNode("x"))
		}
		Yi(e.measure, qe);
		var t = qe.offsetHeight / 50;
		return t > 3 && (e.cachedTextHeight = t), Xi(e.measure), t || 1
	}

	function sn(e) {
		if (null != e.cachedCharWidth) return e.cachedCharWidth;
		var n = Gi("span", "xxxxxxxxxx"),
			t = Gi("pre", [n]);
		Yi(e.measure, t);
		var r = n.getBoundingClientRect(),
			i = (r.right - r.left) / 10;
		return i > 2 && (e.cachedCharWidth = i), i || 10
	}
	var cn, un, dn = 0;

	function hn(e) {
		e.curOp = {
			viewChanged: !1,
			startHeight: e.doc.height,
			forceUpdate: !1,
			updateInput: null,
			typing: !1,
			changeObjs: null,
			cursorActivity: !1,
			selectionChanged: !1,
			updateMaxLine: !1,
			scrollLeft: null,
			scrollTop: null,
			scrollToPos: null,
			id: ++dn
		}, gi++ || (di = [])
	}

	function fn(e) {
		var n = e.curOp,
			t = e.doc,
			r = e.display;
		if (e.curOp = null, n.updateMaxLine && B(e), n.viewChanged || n.forceUpdate || null != n.scrollTop || n.scrollToPos && (n.scrollToPos.from.line < r.viewFrom || n.scrollToPos.to.line >= r.viewTo) || r.maxLineChanged && e.options.lineWrapping) {
			var i = V(e, {
				top: n.scrollTop,
				ensure: n.scrollToPos
			}, n.forceUpdate);
			e.display.scroller.offsetHeight && (e.doc.scrollTop = e.display.scroller.scrollTop)
		}
		if (!i && n.selectionChanged && Ie(e), i || n.startHeight == e.doc.height || j(e), null != n.scrollTop && r.scroller.scrollTop != n.scrollTop) {
			var o = Math.max(0, Math.min(r.scroller.scrollHeight - r.scroller.clientHeight, n.scrollTop));
			r.scroller.scrollTop = r.scrollbarV.scrollTop = t.scrollTop = o
		}
		if (null != n.scrollLeft && r.scroller.scrollLeft != n.scrollLeft) {
			var a = Math.max(0, Math.min(r.scroller.scrollWidth - r.scroller.clientWidth, n.scrollLeft));
			r.scroller.scrollLeft = r.scrollbarH.scrollLeft = t.scrollLeft = a, z(e)
		}
		if (n.scrollToPos) {
			var l = function(e, n, t, r) {
				null == r && (r = 0);
				for (;;) {
					var i = !1,
						o = nn(e, n),
						a = t && t != n ? nn(e, t) : o,
						l = pt(e, Math.min(o.left, a.left), Math.min(o.top, a.top) - r, Math.max(o.left, a.left), Math.max(o.bottom, a.bottom) + r),
						s = e.doc.scrollTop,
						c = e.doc.scrollLeft;
					if (null != l.scrollTop && (Hn(e, l.scrollTop), Math.abs(e.doc.scrollTop - s) > 1 && (i = !0)), null != l.scrollLeft && (zn(e, l.scrollLeft), Math.abs(e.doc.scrollLeft - c) > 1 && (i = !0)), !i) return o
				}
			}(e, ve(e.doc, n.scrollToPos.from), ve(e.doc, n.scrollToPos.to), n.scrollToPos.margin);
			n.scrollToPos.isCursor && e.state.focused && function(e, n) {
				var t = e.display,
					r = t.sizer.getBoundingClientRect(),
					i = null;
				n.top + r.top < 0 ? i = !0 : n.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1);
				if (null != i && !g) {
					var o = Gi("div", "​", null, "position: absolute; top: " + (n.top - t.viewOffset - Fe(e.display)) + "px; height: " + (n.bottom - n.top + _i) + "px; left: " + n.left + "px; width: 2px;");
					e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o)
				}
			}(e, l)
		}
		n.selectionChanged && De(e), e.state.focused && n.updateInput && Tn(e, n.typing);
		var s, c = n.maybeHiddenMarkers,
			u = n.maybeUnhiddenMarkers;
		if (c)
			for (var d = 0; d < c.length; ++d) c[d].lines.length || pi(c[d], "hide");
		if (u)
			for (d = 0; d < u.length; ++d) u[d].lines.length && pi(u[d], "unhide");
		if (--gi || (s = di, di = null), n.changeObjs) {
			for (d = 0; d < n.changeObjs.length; d++) pi(e, "change", e, n.changeObjs[d]);
			pi(e, "changes", e, n.changeObjs)
		}
		if (n.cursorActivity && pi(e, "cursorActivity", e), s)
			for (d = 0; d < s.length; ++d) s[d]()
	}

	function pn(e, n) {
		if (e.curOp) return n();
		hn(e);
		try {
			return n()
		} finally {
			fn(e)
		}
	}

	function gn(e, n) {
		return function() {
			if (e.curOp) return n.apply(e, arguments);
			hn(e);
			try {
				return n.apply(e, arguments)
			} finally {
				fn(e)
			}
		}
	}

	function mn(e) {
		return function() {
			if (this.curOp) return e.apply(this, arguments);
			hn(this);
			try {
				return e.apply(this, arguments)
			} finally {
				fn(this)
			}
		}
	}

	function vn(e) {
		return function() {
			var n = this.cm;
			if (!n || n.curOp) return e.apply(this, arguments);
			hn(n);
			try {
				return e.apply(this, arguments)
			} finally {
				fn(n)
			}
		}
	}

	function yn(e, n, t) {
		this.line = n, this.rest = function(e) {
			var n, t;
			for (; n = or(e);) e = n.find(1, !0).line, (t || (t = [])).push(e);
			return t
		}(n), this.size = this.rest ? Vr(Ii(this.rest)) - t + 1 : 1, this.node = this.text = null, this.hidden = ur(e, n)
	}

	function bn(e, n, t) {
		for (var r, i = [], o = n; o < t; o = r) {
			var a = new yn(e.doc, Hr(e.doc, o), o);
			r = o + a.size, i.push(a)
		}
		return i
	}

	function wn(e, n, t, r) {
		null == n && (n = e.doc.first), null == t && (t = e.doc.first + e.doc.size), r || (r = 0);
		var i = e.display;
		if (r && t < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > n) && (i.updateLineNumbers = n), e.curOp.viewChanged = !0, n >= i.viewTo) x && sr(e.doc, n) < i.viewTo && Cn(e);
		else if (t <= i.viewFrom) x && cr(e.doc, t + r) > i.viewFrom ? Cn(e) : (i.viewFrom += r, i.viewTo += r);
		else if (n <= i.viewFrom && t >= i.viewTo) Cn(e);
		else if (n <= i.viewFrom) {
			(o = xn(e, t, t + r, 1)) ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : Cn(e)
		} else if (t >= i.viewTo) {
			var o;
			(o = xn(e, n, n, -1)) ? (i.view = i.view.slice(0, o.index), i.viewTo = o.lineN) : Cn(e)
		} else {
			var a = xn(e, n, n, -1),
				l = xn(e, t, t + r, 1);
			a && l ? (i.view = i.view.slice(0, a.index).concat(bn(e, a.lineN, l.lineN)).concat(i.view.slice(l.index)), i.viewTo += r) : Cn(e)
		}
		var s = i.externalMeasured;
		s && (t < s.lineN ? s.lineN += r : n < s.lineN + s.size && (i.externalMeasured = null))
	}

	function _n(e, n, t) {
		e.curOp.viewChanged = !0;
		var r = e.display,
			i = e.display.externalMeasured;
		if (i && n >= i.lineN && n < i.lineN + i.size && (r.externalMeasured = null), !(n < r.viewFrom || n >= r.viewTo)) {
			var o = r.view[kn(e, n)];
			if (null != o.node) {
				var a = o.changes || (o.changes = []); - 1 == Ai(a, t) && a.push(t)
			}
		}
	}

	function Cn(e) {
		e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
	}

	function kn(e, n) {
		if (n >= e.display.viewTo) return null;
		if ((n -= e.display.viewFrom) < 0) return null;
		for (var t = e.display.view, r = 0; r < t.length; r++)
			if ((n -= t[r].size) < 0) return r
	}

	function xn(e, n, t, r) {
		var i, o = kn(e, n),
			a = e.display.view;
		if (!x) return {
			index: o,
			lineN: t
		};
		for (var l = 0, s = e.display.viewFrom; l < o; l++) s += a[l].size;
		if (s != n) {
			if (r > 0) {
				if (o == a.length - 1) return null;
				i = s + a[o].size - n, o++
			} else i = s - n;
			n += i, t += i
		}
		for (; sr(e.doc, t) != t;) {
			if (o == (r < 0 ? 0 : a.length - 1)) return null;
			t += r * a[o - (r < 0 ? 1 : 0)].size, o += r
		}
		return {
			index: o,
			lineN: t
		}
	}

	function Sn(e) {
		for (var n = e.display.view, t = 0, r = 0; r < n.length; r++) {
			var i = n[r];
			i.hidden || i.node && !i.changes || ++t
		}
		return t
	}

	function Mn(e) {
		e.display.pollingFast || e.display.poll.set(e.options.pollInterval, (function() {
			Rn(e), e.state.focused && Mn(e)
		}))
	}

	function En(e) {
		var n = !1;
		e.display.pollingFast = !0, e.display.poll.set(20, (function t() {
			Rn(e) || n ? (e.display.pollingFast = !1, Mn(e)) : (n = !0, e.display.poll.set(60, t))
		}))
	}

	function Rn(e) {
		var n = e.display.input,
			t = e.display.prevInput,
			i = e.doc;
		if (!e.state.focused || lo(n) || On(e) || e.options.disableInput) return !1;
		var o = n.value;
		if (o == t && !e.somethingSelected()) return !1;
		if (a && !r && e.display.inputHasSelection === o) return Tn(e), !1;
		var l = !e.curOp;
		l && hn(e), e.display.shift = !1;
		for (var s = 0, c = Math.min(t.length, o.length); s < c && t.charCodeAt(s) == o.charCodeAt(s);) ++s;
		for (var u = o.slice(s), d = ao(u), h = e.state.pasteIncoming && d.length > 1 && i.sel.ranges.length == d.length, f = i.sel.ranges.length - 1; f >= 0; f--) {
			var p = i.sel.ranges[f],
				g = p.from(),
				m = p.to();
			s < t.length ? g = le(g.line, g.ch - (t.length - s)) : e.state.overwrite && p.empty() && !e.state.pasteIncoming && (m = le(m.line, Math.min(Hr(i, m.line).text.length, m.ch + Ii(d).length)));
			var v = e.curOp.updateInput,
				y = {
					from: g,
					to: m,
					text: h ? [d[f]] : d,
					origin: e.state.pasteIncoming ? "paste" : e.state.cutIncoming ? "cut" : "+input"
				};
			if (st(e.doc, y), mi(e, "inputRead", e, y), u && !e.state.pasteIncoming && e.options.electricChars && e.options.smartIndent && p.head.ch < 100 && (!f || i.sel.ranges[f - 1].head.line != p.head.line)) {
				var b = e.getModeAt(p.head).electricChars;
				if (b)
					for (var w = 0; w < b.length; w++)
						if (u.indexOf(b.charAt(w)) > -1) {
							yt(e, p.head.line, "smart");
							break
						}
			}
		}
		return mt(e), e.curOp.updateInput = v, e.curOp.typing = !0, o.length > 1e3 || o.indexOf("\n") > -1 ? n.value = e.display.prevInput = "" : e.display.prevInput = o, l && fn(e), e.state.pasteIncoming = e.state.cutIncoming = !1, !0
	}

	function Tn(e, n) {
		var t, i, o = e.doc;
		if (e.somethingSelected()) {
			e.display.prevInput = "";
			var l = o.sel.primary(),
				s = (t = so && (l.to().line - l.from().line > 100 || (i = e.getSelection()).length > 1e3)) ? "-" : i || e.getSelection();
			e.display.input.value = s, e.state.focused && Oi(e.display.input), a && !r && (e.display.inputHasSelection = s)
		} else n || (e.display.prevInput = e.display.input.value = "", a && !r && (e.display.inputHasSelection = null));
		e.display.inaccurateSelection = t
	}

	function Ln(e) {
		"nocursor" == e.options.readOnly || v && Ki() == e.display.input || e.display.input.focus()
	}

	function In(e) {
		e.state.focused || (Ln(e), et(e))
	}

	function On(e) {
		return e.options.readOnly || e.doc.cantEdit
	}

	function An(e, n) {
		for (var t = ci(n); t != e.wrapper; t = t.parentNode)
			if (!t || t.ignoreEvents || t.parentNode == e.sizer && t != e.mover) return !0
	}

	function Dn(e, n, t, r) {
		var i = e.display;
		if (!t) {
			var o = ci(n);
			if (o == i.scrollbarH || o == i.scrollbarV || o == i.scrollbarFiller || o == i.gutterFiller) return null
		}
		var a, l, s = i.lineSpace.getBoundingClientRect();
		try {
			a = n.clientX - s.left, l = n.clientY - s.top
		} catch (n) {
			return null
		}
		var c, u = on(e, a, l);
		if (r && 1 == u.xRel && (c = Hr(e.doc, u.line).text).length == u.ch) {
			var d = Ei(c, c.length, e.options.tabSize) - c.length;
			u = le(u.line, Math.round((a - He(e.display).left) / sn(e.display)) - d)
		}
		return u
	}

	function Nn(e) {
		if (!yi(this, e)) {
			var t = this,
				o = t.display;
			if (o.shift = e.shiftKey, An(o, e)) l || (o.scroller.draggable = !1, setTimeout((function() {
				o.scroller.draggable = !0
			}), 100));
			else if (!Pn(t, e)) {
				var s = Dn(t, e);
				switch (window.focus(), ui(e)) {
					case 1:
						s ? function(e, t, o) {
							setTimeout(Pi(In, e), 0);
							var s, c = +new Date;
							un && un.time > c - 400 && 0 == se(un.pos, o) ? s = "triple" : cn && cn.time > c - 400 && 0 == se(cn.pos, o) ? (s = "double", un = {
								time: c,
								pos: o
							}) : (s = "single", cn = {
								time: c,
								pos: o
							});
							var u = e.doc.sel,
								d = !1;
							e.options.dragDrop && eo && !d && !On(e) && "single" == s && u.contains(o) > -1 && u.somethingSelected() ? function(e, t, i) {
								var o = e.display,
									a = gn(e, (function(s) {
										l && (o.scroller.draggable = !1), e.state.draggingText = !1, fi(document, "mouseup", a), fi(o.scroller, "drop", a), Math.abs(t.clientX - s.clientX) + Math.abs(t.clientY - s.clientY) < 10 && (oi(s), we(e.doc, i), Ln(e), n && !r && setTimeout((function() {
											document.body.focus(), Ln(e)
										}), 20))
									}));
								l && (o.scroller.draggable = !0);
								e.state.draggingText = a, o.scroller.dragDrop && o.scroller.dragDrop();
								hi(document, "mouseup", a), hi(o.scroller, "drop", a)
							}(e, t, o) : function(e, n, t, r, o) {
								var l = e.display,
									s = e.doc;
								oi(n);
								var c, u, d = s.sel;
								o ? (u = s.sel.contains(t), c = u > -1 ? s.sel.ranges[u] : new fe(t, t)) : c = s.sel.primary();
								if (n.altKey) r = "rect", o || (c = new fe(t, t)), t = Dn(e, n, !0, !0), u = -1;
								else if ("double" == r) {
									var h = kt(s, t);
									c = e.display.shift || s.extend ? be(s, c, h.anchor, h.head) : h
								} else if ("triple" == r) {
									var f = new fe(le(t.line, 0), ve(s, le(t.line + 1, 0)));
									c = e.display.shift || s.extend ? be(s, c, f.anchor, f.head) : f
								} else c = be(s, c, t);
								o ? u > -1 ? Ce(s, u, c, xi) : (u = s.sel.ranges.length, Se(s, pe(s.sel.ranges.concat([c]), u), {
									scroll: !1,
									origin: "*mouse"
								})) : (u = 0, Se(s, new he([c], 0), xi));
								var p = t;

								function g(n) {
									if (0 != se(p, n))
										if (p = n, "rect" == r) {
											for (var i = [], o = e.options.tabSize, a = Ei(Hr(s, t.line).text, t.ch, o), l = Ei(Hr(s, n.line).text, n.ch, o), h = Math.min(a, l), f = Math.max(a, l), g = Math.min(t.line, n.line), m = Math.min(e.lastLine(), Math.max(t.line, n.line)); g <= m; g++) {
												var v = Hr(s, g).text,
													y = Ri(v, h, o);
												h == f ? i.push(new fe(le(g, y), le(g, y))) : v.length > y && i.push(new fe(le(g, y), le(g, Ri(v, f, o))))
											}
											i.length || i.push(new fe(t, t)), Se(s, pe(d.ranges.slice(0, u).concat(i), u), xi)
										} else {
											var b = c,
												w = b.anchor,
												_ = n;
											if ("single" != r) {
												if ("double" == r) var C = kt(s, n);
												else C = new fe(le(n.line, 0), ve(s, le(n.line + 1, 0)));
												se(C.anchor, w) > 0 ? (_ = C.head, w = de(b.from(), C.anchor)) : (_ = C.anchor, w = ue(b.to(), C.head))
											}(i = d.ranges.slice(0))[u] = new fe(ve(s, w), _), Se(s, pe(i, u), xi)
										}
								}
								var m = l.wrapper.getBoundingClientRect(),
									v = 0;

								function y(n) {
									var t = ++v,
										i = Dn(e, n, !0, "rect" == r);
									if (i)
										if (0 != se(i, p)) {
											In(e), g(i);
											var o = H(l, s);
											(i.line >= o.to || i.line < o.from) && setTimeout(gn(e, (function() {
												v == t && y(n)
											})), 150)
										} else {
											var a = n.clientY < m.top ? -20 : n.clientY > m.bottom ? 20 : 0;
											a && setTimeout(gn(e, (function() {
												v == t && (l.scroller.scrollTop += a, y(n))
											})), 50)
										}
								}

								function b(n) {
									v = 1 / 0, oi(n), Ln(e), fi(document, "mousemove", w), fi(document, "mouseup", _), s.history.lastSelOrigin = null
								}
								var w = gn(e, (function(e) {
										(a && !i ? e.buttons : ui(e)) ? y(e): b(e)
									})),
									_ = gn(e, b);
								hi(document, "mousemove", w), hi(document, "mouseup", _)
							}(e, t, o, s, d)
						}(t, e, s) : ci(e) == o.scroller && oi(e);
						break;
					case 2:
						l && (t.state.lastMiddleDown = +new Date), s && we(t.doc, s), setTimeout(Pi(Ln, t), 20), oi(e);
						break;
					case 3:
						C && tt(t, e)
				}
			}
		}
	}

	function Bn(e, n, t, r, i) {
		try {
			var o = n.clientX,
				a = n.clientY
		} catch (n) {
			return !1
		}
		if (o >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
		r && oi(n);
		var l = e.display,
			s = l.lineDiv.getBoundingClientRect();
		if (a > s.bottom || !bi(e, t)) return li(n);
		a -= s.top - l.viewOffset;
		for (var c = 0; c < e.options.gutters.length; ++c) {
			var u = l.gutters.childNodes[c];
			if (u && u.getBoundingClientRect().right >= o) return i(e, t, e, qr(e.doc, a), e.options.gutters[c], n), li(n)
		}
	}

	function Pn(e, n) {
		return Bn(e, n, "gutterClick", !0, mi)
	}
	var Fn = 0;

	function jn(e) {
		var t = this;
		if (!yi(t, e) && !An(t.display, e)) {
			oi(e), n && (Fn = +new Date);
			var r = Dn(t, e, !0),
				i = e.dataTransfer.files;
			if (r && !On(t))
				if (i && i.length && window.FileReader && window.File)
					for (var o = i.length, a = Array(o), l = 0, s = function(e, n) {
							var i = new FileReader;
							i.onload = function() {
								if (a[n] = i.result, ++l == o) {
									var e = {
										from: r = ve(t.doc, r),
										to: r,
										text: ao(a.join("\n")),
										origin: "paste"
									};
									st(t.doc, e), xe(t.doc, ge(r, rt(e)))
								}
							}, i.readAsText(e)
						}, c = 0; c < o; ++c) s(i[c], c);
				else {
					if (t.state.draggingText && t.doc.sel.contains(r) > -1) return t.state.draggingText(e), void setTimeout(Pi(Ln, t), 20);
					try {
						if (a = e.dataTransfer.getData("Text")) {
							var u = t.state.draggingText && t.listSelections();
							if (Me(t.doc, ge(r, r)), u)
								for (c = 0; c < u.length; ++c) ft(t.doc, "", u[c].anchor, u[c].head, "drag");
							t.replaceSelection(a, "around", "paste"), Ln(t)
						}
					} catch (e) {}
				}
		}
	}

	function Hn(n, t) {
		Math.abs(n.doc.scrollTop - t) < 2 || (n.doc.scrollTop = t, e || V(n, {
			top: t
		}), n.display.scroller.scrollTop != t && (n.display.scroller.scrollTop = t), n.display.scrollbarV.scrollTop != t && (n.display.scrollbarV.scrollTop = t), e && V(n), Ne(n, 100))
	}

	function zn(e, n, t) {
		(t ? n == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - n) < 2) || (n = Math.min(n, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), e.doc.scrollLeft = n, z(e), e.display.scroller.scrollLeft != n && (e.display.scroller.scrollLeft = n), e.display.scrollbarH.scrollLeft != n && (e.display.scrollbarH.scrollLeft = n))
	}
	var Wn, Un = 0,
		Vn = null;

	function qn(n, t) {
		var r = t.wheelDeltaX,
			i = t.wheelDeltaY;
		null == r && t.detail && t.axis == t.HORIZONTAL_AXIS && (r = t.detail), null == i && t.detail && t.axis == t.VERTICAL_AXIS ? i = t.detail : null == i && (i = t.wheelDelta);
		var o = n.display,
			a = o.scroller;
		if (r && a.scrollWidth > a.clientWidth || i && a.scrollHeight > a.clientHeight) {
			if (i && y && l) e: for (var s = t.target, c = o.view; s != a; s = s.parentNode)
				for (var d = 0; d < c.length; d++)
					if (c[d].node == s) {
						n.display.currentWheelTarget = s;
						break e
					} if (r && !e && !u && null != Vn) return i && Hn(n, Math.max(0, Math.min(a.scrollTop + i * Vn, a.scrollHeight - a.clientHeight))), zn(n, Math.max(0, Math.min(a.scrollLeft + r * Vn, a.scrollWidth - a.clientWidth))), oi(t), void(o.wheelStartX = null);
			if (i && null != Vn) {
				var h = i * Vn,
					f = n.doc.scrollTop,
					p = f + o.wrapper.clientHeight;
				h < 0 ? f = Math.max(0, f + h - 50) : p = Math.min(n.doc.height, p + h + 50), V(n, {
					top: f,
					bottom: p
				})
			}
			Un < 20 && (null == o.wheelStartX ? (o.wheelStartX = a.scrollLeft, o.wheelStartY = a.scrollTop, o.wheelDX = r, o.wheelDY = i, setTimeout((function() {
				if (null != o.wheelStartX) {
					var e = a.scrollLeft - o.wheelStartX,
						n = a.scrollTop - o.wheelStartY,
						t = n && o.wheelDY && n / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
					o.wheelStartX = o.wheelStartY = null, t && (Vn = (Vn * Un + t) / (Un + 1), ++Un)
				}
			}), 200)) : (o.wheelDX += r, o.wheelDY += i))
		}
	}

	function Gn(e, n, t) {
		if ("string" == typeof n && !(n = Nt[n])) return !1;
		e.display.pollingFast && Rn(e) && (e.display.pollingFast = !1);
		var r = e.display.shift,
			i = !1;
		try {
			On(e) && (e.state.suppressEdits = !0), t && (e.display.shift = !1), i = n(e) != Ci
		} finally {
			e.display.shift = r, e.state.suppressEdits = !1
		}
		return i
	}

	function Xn(e) {
		var n = e.state.keyMaps.slice(0);
		return e.options.extraKeys && n.push(e.options.extraKeys), n.push(e.options.keyMap), n
	}

	function Yn(e, n) {
		var t = Pt(e.options.keyMap),
			r = t.auto;
		clearTimeout(Wn), r && !jt(n) && (Wn = setTimeout((function() {
			Pt(e.options.keyMap) == t && (e.options.keyMap = r.call ? r.call(null, e) : r, I(e))
		}), 50));
		var i = Ht(n, !0),
			o = !1;
		if (!i) return !1;
		var a = Xn(e);
		return (o = n.shiftKey ? Ft("Shift-" + i, a, (function(n) {
			return Gn(e, n, !0)
		})) || Ft(i, a, (function(n) {
			if ("string" == typeof n ? /^go[A-Z]/.test(n) : n.motion) return Gn(e, n)
		})) : Ft(i, a, (function(n) {
			return Gn(e, n)
		}))) && (oi(n), De(e), mi(e, "keyHandled", e, i, n)), o
	}
	a ? Vn = -.53 : e ? Vn = 15 : c ? Vn = -.7 : d && (Vn = -1 / 3);
	var Jn, Kn = null;

	function $n(e) {
		var t = this;
		if (In(t), !yi(t, e)) {
			n && 27 == e.keyCode && (e.returnValue = !1);
			var r = e.keyCode;
			t.display.shift = 16 == r || e.shiftKey;
			var i = Yn(t, e);
			u && (Kn = i ? r : null, i || 88 != r || so || !(y ? e.metaKey : e.ctrlKey) || t.replaceSelection("", null, "cut"))
		}
	}

	function Qn(e) {
		yi(this, e) || 16 == e.keyCode && (this.doc.sel.shift = !1)
	}

	function Zn(e) {
		var n = this;
		if (!yi(n, e)) {
			var t = e.keyCode,
				i = e.charCode;
			if (u && t == Kn) return Kn = null, void oi(e);
			if (!(u && (!e.which || e.which < 10) || h) || !Yn(n, e))(function(e, n, t) {
				var r = Ft("'" + t + "'", Xn(e), (function(n) {
					return Gn(e, n, !0)
				}));
				return r && (oi(n), De(e), mi(e, "keyHandled", e, "'" + t + "'", n)), r
			})(n, e, String.fromCharCode(null == i ? t : i)) || (a && !r && (n.display.inputHasSelection = null), En(n))
		}
	}

	function et(e) {
		"nocursor" != e.options.readOnly && (e.state.focused || (pi(e, "focus", e), e.state.focused = !0, -1 == e.display.wrapper.className.search(/\bCodeMirror-focused\b/) && (e.display.wrapper.className += " CodeMirror-focused"), e.curOp || (Tn(e), l && setTimeout(Pi(Tn, e, !0), 0))), Mn(e), De(e))
	}

	function nt(e) {
		e.state.focused && (pi(e, "blur", e), e.state.focused = !1, e.display.wrapper.className = e.display.wrapper.className.replace(" CodeMirror-focused", "")), clearInterval(e.display.blinker), setTimeout((function() {
			e.state.focused || (e.display.shift = !1)
		}), 150)
	}

	function tt(e, n) {
		if (!yi(e, n, "contextmenu")) {
			var t = e.display;
			if (!An(t, n) && ! function(e, n) {
					return !!bi(e, "gutterContextMenu") && Bn(e, n, "gutterContextMenu", !1, pi)
				}(e, n)) {
				var i = Dn(e, n),
					o = t.scroller.scrollTop;
				if (i && !u) {
					e.options.resetSelectionOnContextMenu && -1 == e.doc.sel.contains(i) && gn(e, Se)(e.doc, ge(i), ki);
					var l = t.input.style.cssText;
					if (t.inputDiv.style.position = "absolute", t.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (n.clientY - 5) + "px; left: " + (n.clientX - 5) + "px; z-index: 1000; background: " + (a ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", Ln(e), Tn(e), e.somethingSelected() || (t.input.value = t.prevInput = " "), a && !r && c(), C) {
						si(n);
						var s = function() {
							fi(window, "mouseup", s), setTimeout(d, 20)
						};
						hi(window, "mouseup", s)
					} else setTimeout(d, 50)
				}
			}
		}

		function c() {
			if (null != t.input.selectionStart) {
				var n = t.input.value = "​" + (e.somethingSelected() ? t.input.value : "");
				t.prevInput = "​", t.input.selectionStart = 1, t.input.selectionEnd = n.length
			}
		}

		function d() {
			if (t.inputDiv.style.position = "relative", t.input.style.cssText = l, r && (t.scrollbarV.scrollTop = t.scroller.scrollTop = o), Mn(e), null != t.input.selectionStart) {
				a && !r || c(), clearTimeout(Jn);
				var n = 0,
					i = function() {
						"​" == t.prevInput && 0 == t.input.selectionStart ? gn(e, Nt.selectAll)(e) : n++ < 10 ? Jn = setTimeout(i, 500) : Tn(e)
					};
				Jn = setTimeout(i, 200)
			}
		}
	}
	var rt = S.changeEnd = function(e) {
		return e.text ? le(e.from.line + e.text.length - 1, Ii(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
	};

	function it(e, n) {
		if (se(e, n.from) < 0) return e;
		if (se(e, n.to) <= 0) return rt(n);
		var t = e.line + n.text.length - (n.to.line - n.from.line) - 1,
			r = e.ch;
		return e.line == n.to.line && (r += rt(n).ch - n.to.ch), le(t, r)
	}

	function ot(e, n) {
		for (var t = [], r = 0; r < e.sel.ranges.length; r++) {
			var i = e.sel.ranges[r];
			t.push(new fe(it(i.anchor, n), it(i.head, n)))
		}
		return pe(t, e.sel.primIndex)
	}

	function at(e, n, t) {
		return e.line == n.line ? le(t.line, e.ch - n.ch + t.ch) : le(t.line + (e.line - n.line), e.ch)
	}

	function lt(e, n, t) {
		var r = {
			canceled: !1,
			from: n.from,
			to: n.to,
			text: n.text,
			origin: n.origin,
			cancel: function() {
				this.canceled = !0
			}
		};
		return t && (r.update = function(n, t, r, i) {
			n && (this.from = ve(e, n)), t && (this.to = ve(e, t)), r && (this.text = r), void 0 !== i && (this.origin = i)
		}), pi(e, "beforeChange", e, r), e.cm && pi(e.cm, "beforeChange", e.cm, r), r.canceled ? null : {
			from: r.from,
			to: r.to,
			text: r.text,
			origin: r.origin
		}
	}

	function st(e, n, t) {
		if (e.cm) {
			if (!e.cm.curOp) return gn(e.cm, st)(e, n, t);
			if (e.cm.state.suppressEdits) return
		}
		if (!(bi(e, "beforeChange") || e.cm && bi(e.cm, "beforeChange")) || (n = lt(e, n, !0))) {
			var r = k && !t && function(e, n, t) {
				var r = null;
				if (e.iter(n.line, t.line + 1, (function(e) {
						if (e.markedSpans)
							for (var n = 0; n < e.markedSpans.length; ++n) {
								var t = e.markedSpans[n].marker;
								!t.readOnly || r && -1 != Ai(r, t) || (r || (r = [])).push(t)
							}
					})), !r) return null;
				for (var i = [{
						from: n,
						to: t
					}], o = 0; o < r.length; ++o)
					for (var a = r[o], l = a.find(0), s = 0; s < i.length; ++s) {
						var c = i[s];
						if (!(se(c.to, l.from) < 0 || se(c.from, l.to) > 0)) {
							var u = [s, 1],
								d = se(c.from, l.from),
								h = se(c.to, l.to);
							(d < 0 || !a.inclusiveLeft && !d) && u.push({
								from: c.from,
								to: l.from
							}), (h > 0 || !a.inclusiveRight && !h) && u.push({
								from: l.to,
								to: c.to
							}), i.splice.apply(i, u), s += u.length - 1
						}
					}
				return i
			}(e, n.from, n.to);
			if (r)
				for (var i = r.length - 1; i >= 0; --i) ct(e, {
					from: r[i].from,
					to: r[i].to,
					text: i ? [""] : n.text
				});
			else ct(e, n)
		}
	}

	function ct(e, n) {
		if (1 != n.text.length || "" != n.text[0] || 0 != se(n.from, n.to)) {
			var t = ot(e, n);
			$r(e, n, t, e.cm ? e.cm.curOp.id : NaN), ht(e, n, t, Jt(e, n));
			var r = [];
			Fr(e, (function(e, t) {
				t || -1 != Ai(r, e.history) || (ii(e.history, n), r.push(e.history)), ht(e, n, null, Jt(e, n))
			}))
		}
	}

	function ut(e, n, t) {
		if (!e.cm || !e.cm.state.suppressEdits) {
			for (var r, i = e.history, o = e.sel, a = "undo" == n ? i.done : i.undone, l = "undo" == n ? i.undone : i.done, s = 0; s < a.length && (r = a[s], t ? !r.ranges || r.equals(e.sel) : r.ranges); s++);
			if (s != a.length) {
				for (i.lastOrigin = i.lastSelOrigin = null;
					(r = a.pop()).ranges;) {
					if (Qr(r, l), t && !r.equals(e.sel)) return void Se(e, r, {
						clearRedo: !1
					});
					o = r
				}
				var c = [];
				Qr(o, l), l.push({
					changes: c,
					generation: i.generation
				}), i.generation = r.generation || ++i.maxGeneration;
				var u = bi(e, "beforeChange") || e.cm && bi(e.cm, "beforeChange");
				for (s = r.changes.length - 1; s >= 0; --s) {
					var d = r.changes[s];
					if (d.origin = n, u && !lt(e, d, !1)) return void(a.length = 0);
					c.push(Jr(e, d));
					var h = s ? ot(e, d) : Ii(a);
					ht(e, d, h, $t(e, d)), e.cm && mt(e.cm);
					var f = [];
					Fr(e, (function(e, n) {
						n || -1 != Ai(f, e.history) || (ii(e.history, d), f.push(e.history)), ht(e, d, null, $t(e, d))
					}))
				}
			}
		}
	}

	function dt(e, n) {
		e.first += n, e.sel = new he(Di(e.sel.ranges, (function(e) {
			return new fe(le(e.anchor.line + n, e.anchor.ch), le(e.head.line + n, e.head.ch))
		})), e.sel.primIndex), e.cm && wn(e.cm, e.first, e.first - n, n)
	}

	function ht(e, n, t, r) {
		if (e.cm && !e.cm.curOp) return gn(e.cm, ht)(e, n, t, r);
		if (n.to.line < e.first) dt(e, n.text.length - 1 - (n.to.line - n.from.line));
		else if (!(n.from.line > e.lastLine())) {
			if (n.from.line < e.first) {
				var i = n.text.length - 1 - (e.first - n.from.line);
				dt(e, i), n = {
					from: le(e.first, 0),
					to: le(n.to.line + i, n.to.ch),
					text: [Ii(n.text)],
					origin: n.origin
				}
			}
			var o = e.lastLine();
			n.to.line > o && (n = {
				from: n.from,
				to: le(o, Hr(e, o).text.length),
				text: [n.text[0]],
				origin: n.origin
			}), n.removed = zr(e, n.from, n.to), t || (t = ot(e, n)), e.cm ? function(e, n, t) {
				var r = e.doc,
					i = e.display,
					o = n.from,
					a = n.to,
					l = !1,
					s = o.line;
				e.options.lineWrapping || (s = Vr(lr(Hr(r, o.line))), r.iter(s, a.line + 1, (function(e) {
					if (e == i.maxLine) return l = !0, !0
				})));
				r.sel.contains(n.from, n.to) > -1 && (e.curOp.cursorActivity = !0);
				Ir(r, n, t, T(e)), e.options.lineWrapping || (r.iter(s, o.line + n.text.length, (function(e) {
					var n = N(e);
					n > i.maxLineLength && (i.maxLine = e, i.maxLineLength = n, i.maxLineChanged = !0, l = !1)
				})), l && (e.curOp.updateMaxLine = !0));
				r.frontier = Math.min(r.frontier, o.line), Ne(e, 400);
				var c = n.text.length - (a.line - o.line) - 1;
				o.line != a.line || 1 != n.text.length || Lr(e.doc, n) ? wn(e, o.line, a.line + 1, c) : _n(e, o.line, "text");
				(bi(e, "change") || bi(e, "changes")) && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push({
					from: o,
					to: a,
					text: n.text,
					removed: n.removed,
					origin: n.origin
				})
			}(e.cm, n, r) : Ir(e, n, r), Me(e, t, ki)
		}
	}

	function ft(e, n, t, r, i) {
		if (r || (r = t), se(r, t) < 0) {
			var o = r;
			r = t, t = o
		}
		"string" == typeof n && (n = ao(n)), st(e, {
			from: t,
			to: r,
			text: n,
			origin: i
		})
	}

	function pt(e, n, t, r, i) {
		var o = e.display,
			a = ln(e.display);
		t < 0 && (t = 0);
		var l = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : o.scroller.scrollTop,
			s = o.scroller.clientHeight - _i,
			c = {},
			u = e.doc.height + je(o),
			d = t < a,
			h = i > u - a;
		if (t < l) c.scrollTop = d ? 0 : t;
		else if (i > l + s) {
			var f = Math.min(t, (h ? u : i) - s);
			f != l && (c.scrollTop = f)
		}
		var p = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : o.scroller.scrollLeft,
			g = o.scroller.clientWidth - _i;
		n += o.gutters.offsetWidth, r += o.gutters.offsetWidth;
		var m = o.gutters.offsetWidth,
			v = n < m + 10;
		return n < p + m || v ? (v && (n = 0), c.scrollLeft = Math.max(0, n - 10 - m)) : r > g + p - 3 && (c.scrollLeft = r + 10 - g), c
	}

	function gt(e, n, t) {
		null == n && null == t || vt(e), null != n && (e.curOp.scrollLeft = (null == e.curOp.scrollLeft ? e.doc.scrollLeft : e.curOp.scrollLeft) + n), null != t && (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t)
	}

	function mt(e) {
		vt(e);
		var n = e.getCursor(),
			t = n,
			r = n;
		e.options.lineWrapping || (t = n.ch ? le(n.line, n.ch - 1) : n, r = le(n.line, n.ch + 1)), e.curOp.scrollToPos = {
			from: t,
			to: r,
			margin: e.options.cursorScrollMargin,
			isCursor: !0
		}
	}

	function vt(e) {
		var n = e.curOp.scrollToPos;
		if (n) {
			e.curOp.scrollToPos = null;
			var t = tn(e, n.from),
				r = tn(e, n.to),
				i = pt(e, Math.min(t.left, r.left), Math.min(t.top, r.top) - n.margin, Math.max(t.right, r.right), Math.max(t.bottom, r.bottom) + n.margin);
			e.scrollTo(i.scrollLeft, i.scrollTop)
		}
	}

	function yt(e, n, t, r) {
		var i, o = e.doc;
		null == t && (t = "add"), "smart" == t && (e.doc.mode.indent ? i = Pe(e, n) : t = "prev");
		var a = e.options.tabSize,
			l = Hr(o, n),
			s = Ei(l.text, null, a);
		l.stateAfter && (l.stateAfter = null);
		var c, u = l.text.match(/^\s*/)[0];
		if (r || /\S/.test(l.text)) {
			if ("smart" == t && (c = e.doc.mode.indent(i, l.text.slice(u.length), l.text)) == Ci) {
				if (!r) return;
				t = "prev"
			}
		} else c = 0, t = "not";
		"prev" == t ? c = n > o.first ? Ei(Hr(o, n - 1).text, null, a) : 0 : "add" == t ? c = s + e.options.indentUnit : "subtract" == t ? c = s - e.options.indentUnit : "number" == typeof t && (c = s + t), c = Math.max(0, c);
		var d = "",
			h = 0;
		if (e.options.indentWithTabs)
			for (var f = Math.floor(c / a); f; --f) h += a, d += "\t";
		if (h < c && (d += Li(c - h)), d != u) ft(e.doc, d, le(n, 0), le(n, u.length), "+input");
		else
			for (f = 0; f < o.sel.ranges.length; f++) {
				var p = o.sel.ranges[f];
				if (p.head.line == n && p.head.ch < u.length) {
					Ce(o, f, new fe(h = le(n, u.length), h));
					break
				}
			}
		l.stateAfter = null
	}

	function bt(e, n, t, r) {
		var i = n,
			o = n,
			a = e.doc;
		return "number" == typeof n ? o = Hr(a, me(a, n)) : i = Vr(n), null == i ? null : r(o, i) ? (_n(e, i, t), o) : null
	}

	function wt(e, n) {
		for (var t = e.doc.sel.ranges, r = [], i = 0; i < t.length; i++) {
			for (var o = n(t[i]); r.length && se(o.from, Ii(r).to) <= 0;) {
				var a = r.pop();
				if (se(a.from, o.from) < 0) {
					o.from = a.from;
					break
				}
			}
			r.push(o)
		}
		pn(e, (function() {
			for (var n = r.length - 1; n >= 0; n--) ft(e.doc, "", r[n].from, r[n].to, "+delete");
			mt(e)
		}))
	}

	function _t(e, n, t, r, i) {
		var o = n.line,
			a = n.ch,
			l = t,
			s = Hr(e, o),
			c = !0;

		function u(n) {
			var r, l = (i ? bo : wo)(s, a, t, !0);
			if (null == l) {
				if (n || !((r = o + t) < e.first || r >= e.first + e.size ? c = !1 : (o = r, s = Hr(e, r)))) return c = !1;
				a = i ? (t < 0 ? po : fo)(s) : t < 0 ? s.text.length : 0
			} else a = l;
			return !0
		}
		if ("char" == r) u();
		else if ("column" == r) u(!0);
		else if ("word" == r || "group" == r)
			for (var d = null, h = "group" == r, f = !0; !(t < 0) || u(!f); f = !1) {
				var p = s.text.charAt(a) || "\n",
					g = ji(p) ? "w" : h && "\n" == p ? "n" : !h || /\s/.test(p) ? null : "p";
				if (!h || f || g || (g = "s"), d && d != g) {
					t < 0 && (t = 1, u());
					break
				}
				if (g && (d = g), t > 0 && !u(!f)) break
			}
		var m = Le(e, le(o, a), l, !0);
		return c || (m.hitSide = !0), m
	}

	function Ct(e, n, t, r) {
		var i, o = e.doc,
			a = n.left;
		if ("page" == r) {
			var l = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
			i = n.top + t * (l - (t < 0 ? 1.5 : .5) * ln(e.display))
		} else "line" == r && (i = t > 0 ? n.bottom + 3 : n.top - 3);
		for (;;) {
			var s = on(e, a, i);
			if (!s.outside) break;
			if (t < 0 ? i <= 0 : i >= o.height) {
				s.hitSide = !0;
				break
			}
			i += 5 * t
		}
		return s
	}

	function kt(e, n) {
		var t = Hr(e, n.line).text,
			r = n.ch,
			i = n.ch;
		if (t) {
			(n.xRel < 0 || i == t.length) && r ? --r : ++i;
			for (var o = t.charAt(r), a = ji(o) ? ji : /\s/.test(o) ? function(e) {
					return /\s/.test(e)
				} : function(e) {
					return !/\s/.test(e) && !ji(e)
				}; r > 0 && a(t.charAt(r - 1));) --r;
			for (; i < t.length && a(t.charAt(i));) ++i
		}
		return new fe(le(n.line, r), le(n.line, i))
	}
	S.prototype = {
		constructor: S,
		posFromMouse: function(e) {
			return Dn(this, e, !0)
		},
		focus: function() {
			window.focus(), Ln(this), En(this)
		},
		setOption: function(e, n) {
			var t = this.options,
				r = t[e];
			t[e] == n && "mode" != e || (t[e] = n, St.hasOwnProperty(e) && gn(this, St[e])(this, n, r))
		},
		getOption: function(e) {
			return this.options[e]
		},
		getDoc: function() {
			return this.doc
		},
		addKeyMap: function(e, n) {
			this.state.keyMaps[n ? "push" : "unshift"](e)
		},
		removeKeyMap: function(e) {
			for (var n = this.state.keyMaps, t = 0; t < n.length; ++t)
				if (n[t] == e || "string" != typeof n[t] && n[t].name == e) return n.splice(t, 1), !0
		},
		addOverlay: mn((function(e, n) {
			var t = e.token ? e : S.getMode(this.options, e);
			if (t.startState) throw new Error("Overlays may not be stateful.");
			this.state.overlays.push({
				mode: t,
				modeSpec: e,
				opaque: n && n.opaque
			}), this.state.modeGen++, wn(this)
		})),
		removeOverlay: mn((function(e) {
			for (var n = this.state.overlays, t = 0; t < n.length; ++t) {
				var r = n[t].modeSpec;
				if (r == e || "string" == typeof e && r.name == e) return n.splice(t, 1), this.state.modeGen++, void wn(this)
			}
		})),
		indentLine: mn((function(e, n, t) {
			"string" != typeof n && "number" != typeof n && (n = null == n ? this.options.smartIndent ? "smart" : "prev" : n ? "add" : "subtract"), ye(this.doc, e) && yt(this, e, n, t)
		})),
		indentSelection: mn((function(e) {
			for (var n = this.doc.sel.ranges, t = -1, r = 0; r < n.length; r++) {
				var i = n[r];
				if (i.empty()) i.head.line > t && (yt(this, i.head.line, e, !0), t = i.head.line, r == this.doc.sel.primIndex && mt(this));
				else {
					var o = Math.max(t, i.from().line),
						a = i.to();
					t = Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;
					for (var l = o; l < t; ++l) yt(this, l, e)
				}
			}
		})),
		getTokenAt: function(e, n) {
			for (var t = this.doc, r = Pe(this, (e = ve(t, e)).line, n), i = this.doc.mode, o = Hr(t, e.line), a = new zt(o.text, this.options.tabSize); a.pos < e.ch && !a.eol();) {
				a.start = a.pos;
				var l = i.token(a, r)
			}
			return {
				start: a.start,
				end: a.pos,
				string: a.current(),
				type: l || null,
				state: r
			}
		},
		getTokenTypeAt: function(e) {
			e = ve(this.doc, e);
			var n = br(this, Hr(this.doc, e.line)),
				t = 0,
				r = (n.length - 1) / 2,
				i = e.ch;
			if (0 == i) return n[2];
			for (;;) {
				var o = t + r >> 1;
				if ((o ? n[2 * o - 1] : 0) >= i) r = o;
				else {
					if (!(n[2 * o + 1] < i)) return n[2 * o + 2];
					t = o + 1
				}
			}
		},
		getModeAt: function(e) {
			var n = this.doc.mode;
			return n.innerMode ? S.innerMode(n, this.getTokenAt(e).state).mode : n
		},
		getHelper: function(e, n) {
			return this.getHelpers(e, n)[0]
		},
		getHelpers: function(e, n) {
			var t = [];
			if (!Ot.hasOwnProperty(n)) return Ot;
			var r = Ot[n],
				i = this.getModeAt(e);
			if ("string" == typeof i[n]) r[i[n]] && t.push(r[i[n]]);
			else if (i[n])
				for (var o = 0; o < i[n].length; o++) {
					var a = r[i[n][o]];
					a && t.push(a)
				} else i.helperType && r[i.helperType] ? t.push(r[i.helperType]) : r[i.name] && t.push(r[i.name]);
			for (o = 0; o < r._global.length; o++) {
				var l = r._global[o];
				l.pred(i, this) && -1 == Ai(t, l.val) && t.push(l.val)
			}
			return t
		},
		getStateAfter: function(e, n) {
			var t = this.doc;
			return Pe(this, (e = me(t, null == e ? t.first + t.size - 1 : e)) + 1, n)
		},
		cursorCoords: function(e, n) {
			var t = this.doc.sel.primary();
			return nn(this, null == e ? t.head : "object" == typeof e ? ve(this.doc, e) : e ? t.from() : t.to(), n || "page")
		},
		charCoords: function(e, n) {
			return en(this, ve(this.doc, e), n || "page")
		},
		coordsChar: function(e, n) {
			return on(this, (e = Ze(this, e, n || "page")).left, e.top)
		},
		lineAtHeight: function(e, n) {
			return e = Ze(this, {
				top: e,
				left: 0
			}, n || "page").top, qr(this.doc, e + this.display.viewOffset)
		},
		heightAtLine: function(e, n) {
			var t = !1,
				r = this.doc.first + this.doc.size - 1;
			e < this.doc.first ? e = this.doc.first : e > r && (e = r, t = !0);
			var i = Hr(this.doc, e);
			return Qe(this, i, {
				top: 0,
				left: 0
			}, n || "page").top + (t ? this.doc.height - Gr(i) : 0)
		},
		defaultTextHeight: function() {
			return ln(this.display)
		},
		defaultCharWidth: function() {
			return sn(this.display)
		},
		setGutterMarker: mn((function(e, n, t) {
			return bt(this, e, "gutter", (function(e) {
				var r = e.gutterMarkers || (e.gutterMarkers = {});
				return r[n] = t, !t && Hi(r) && (e.gutterMarkers = null), !0
			}))
		})),
		clearGutter: mn((function(e) {
			var n = this,
				t = n.doc,
				r = t.first;
			t.iter((function(t) {
				t.gutterMarkers && t.gutterMarkers[e] && (t.gutterMarkers[e] = null, _n(n, r, "gutter"), Hi(t.gutterMarkers) && (t.gutterMarkers = null)), ++r
			}))
		})),
		addLineClass: mn((function(e, n, t) {
			return bt(this, e, "class", (function(e) {
				var r = "text" == n ? "textClass" : "background" == n ? "bgClass" : "wrapClass";
				if (e[r]) {
					if (new RegExp("(?:^|\\s)" + t + "(?:$|\\s)").test(e[r])) return !1;
					e[r] += " " + t
				} else e[r] = t;
				return !0
			}))
		})),
		removeLineClass: mn((function(e, n, t) {
			return bt(this, e, "class", (function(e) {
				var r = "text" == n ? "textClass" : "background" == n ? "bgClass" : "wrapClass",
					i = e[r];
				if (!i) return !1;
				if (null == t) e[r] = null;
				else {
					var o = i.match(new RegExp("(?:^|\\s+)" + t + "(?:$|\\s+)"));
					if (!o) return !1;
					var a = o.index + o[0].length;
					e[r] = i.slice(0, o.index) + (o.index && a != i.length ? " " : "") + i.slice(a) || null
				}
				return !0
			}))
		})),
		addLineWidget: mn((function(e, n, t) {
			return function(e, n, t, r) {
				var i = new hr(e, t, r);
				i.noHScroll && (e.display.alignWidgets = !0);
				return bt(e, n, "widget", (function(n) {
					var t = n.widgets || (n.widgets = []);
					if (null == i.insertAt ? t.push(i) : t.splice(Math.min(t.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = n, !ur(e.doc, n)) {
						var r = Gr(n) < e.doc.scrollTop;
						Ur(n, n.height + pr(i)), r && gt(e, null, i.height), e.curOp.forceUpdate = !0
					}
					return !0
				})), i
			}(this, e, n, t)
		})),
		removeLineWidget: function(e) {
			e.clear()
		},
		lineInfo: function(e) {
			if ("number" == typeof e) {
				if (!ye(this.doc, e)) return null;
				var n = e;
				if (!(e = Hr(this.doc, e))) return null
			} else {
				if (null == (n = Vr(e))) return null
			}
			return {
				line: n,
				handle: e,
				text: e.text,
				gutterMarkers: e.gutterMarkers,
				textClass: e.textClass,
				bgClass: e.bgClass,
				wrapClass: e.wrapClass,
				widgets: e.widgets
			}
		},
		getViewport: function() {
			return {
				from: this.display.viewFrom,
				to: this.display.viewTo
			}
		},
		addWidget: function(e, n, t, r, i) {
			var o, a, l, s, c, u, d = this.display,
				h = (e = nn(this, ve(this.doc, e))).bottom,
				f = e.left;
			if (n.style.position = "absolute", d.sizer.appendChild(n), "over" == r) h = e.top;
			else if ("above" == r || "near" == r) {
				var p = Math.max(d.wrapper.clientHeight, this.doc.height),
					g = Math.max(d.sizer.clientWidth, d.lineSpace.clientWidth);
				("above" == r || e.bottom + n.offsetHeight > p) && e.top > n.offsetHeight ? h = e.top - n.offsetHeight : e.bottom + n.offsetHeight <= p && (h = e.bottom), f + n.offsetWidth > g && (f = g - n.offsetWidth)
			}
			n.style.top = h + "px", n.style.left = n.style.right = "", "right" == i ? (f = d.sizer.clientWidth - n.offsetWidth, n.style.right = "0px") : ("left" == i ? f = 0 : "middle" == i && (f = (d.sizer.clientWidth - n.offsetWidth) / 2), n.style.left = f + "px"), t && (o = this, a = f, l = h, s = f + n.offsetWidth, c = h + n.offsetHeight, null != (u = pt(o, a, l, s, c)).scrollTop && Hn(o, u.scrollTop), null != u.scrollLeft && zn(o, u.scrollLeft))
		},
		triggerOnKeyDown: mn($n),
		triggerOnKeyPress: mn(Zn),
		triggerOnKeyUp: mn(Qn),
		execCommand: function(e) {
			if (Nt.hasOwnProperty(e)) return Nt[e](this)
		},
		findPosH: function(e, n, t, r) {
			var i = 1;
			n < 0 && (i = -1, n = -n);
			for (var o = 0, a = ve(this.doc, e); o < n && !(a = _t(this.doc, a, i, t, r)).hitSide; ++o);
			return a
		},
		moveH: mn((function(e, n) {
			var t = this;
			t.extendSelectionsBy((function(r) {
				return t.display.shift || t.doc.extend || r.empty() ? _t(t.doc, r.head, e, n, t.options.rtlMoveVisually) : e < 0 ? r.from() : r.to()
			}), Si)
		})),
		deleteH: mn((function(e, n) {
			var t = this.doc.sel,
				r = this.doc;
			t.somethingSelected() ? r.replaceSelection("", null, "+delete") : wt(this, (function(t) {
				var i = _t(r, t.head, e, n, !1);
				return e < 0 ? {
					from: i,
					to: t.head
				} : {
					from: t.head,
					to: i
				}
			}))
		})),
		findPosV: function(e, n, t, r) {
			var i = 1,
				o = r;
			n < 0 && (i = -1, n = -n);
			for (var a = 0, l = ve(this.doc, e); a < n; ++a) {
				var s = nn(this, l, "div");
				if (null == o ? o = s.left : s.left = o, (l = Ct(this, s, i, t)).hitSide) break
			}
			return l
		},
		moveV: mn((function(e, n) {
			var t = this,
				r = this.doc,
				i = [],
				o = !t.display.shift && !r.extend && r.sel.somethingSelected();
			if (r.extendSelectionsBy((function(a) {
					if (o) return e < 0 ? a.from() : a.to();
					var l = nn(t, a.head, "div");
					null != a.goalColumn && (l.left = a.goalColumn), i.push(l.left);
					var s = Ct(t, l, e, n);
					return "page" == n && a == r.sel.primary() && gt(t, null, en(t, s, "div").top - l.top), s
				}), Si), i.length)
				for (var a = 0; a < r.sel.ranges.length; a++) r.sel.ranges[a].goalColumn = i[a]
		})),
		toggleOverwrite: function(e) {
			null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? this.display.cursorDiv.className += " CodeMirror-overwrite" : this.display.cursorDiv.className = this.display.cursorDiv.className.replace(" CodeMirror-overwrite", ""), pi(this, "overwriteToggle", this, this.state.overwrite))
		},
		hasFocus: function() {
			return Ki() == this.display.input
		},
		scrollTo: mn((function(e, n) {
			null == e && null == n || vt(this), null != e && (this.curOp.scrollLeft = e), null != n && (this.curOp.scrollTop = n)
		})),
		getScrollInfo: function() {
			var e = this.display.scroller,
				n = _i;
			return {
				left: e.scrollLeft,
				top: e.scrollTop,
				height: e.scrollHeight - n,
				width: e.scrollWidth - n,
				clientHeight: e.clientHeight - n,
				clientWidth: e.clientWidth - n
			}
		},
		scrollIntoView: mn((function(e, n) {
			if (null == e ? (e = {
					from: this.doc.sel.primary().head,
					to: null
				}, null == n && (n = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
					from: le(e, 0),
					to: null
				} : null == e.from && (e = {
					from: e,
					to: null
				}), e.to || (e.to = e.from), e.margin = n || 0, null != e.from.line) vt(this), this.curOp.scrollToPos = e;
			else {
				var t = pt(this, Math.min(e.from.left, e.to.left), Math.min(e.from.top, e.to.top) - e.margin, Math.max(e.from.right, e.to.right), Math.max(e.from.bottom, e.to.bottom) + e.margin);
				this.scrollTo(t.scrollLeft, t.scrollTop)
			}
		})),
		setSize: mn((function(e, n) {
			function t(e) {
				return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
			}
			null != e && (this.display.wrapper.style.width = t(e)), null != n && (this.display.wrapper.style.height = t(n)), this.options.lineWrapping && Ye(this), this.curOp.forceUpdate = !0, pi(this, "refresh", this)
		})),
		operation: function(e) {
			return pn(this, e)
		},
		refresh: mn((function() {
			var e = this.display.cachedTextHeight;
			wn(this), Je(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), (null == e || Math.abs(e - ln(this.display)) > .5) && L(this), pi(this, "refresh", this)
		})),
		swapDoc: mn((function(e) {
			var n = this.doc;
			return n.cm = null, jr(this, e), Je(this), Tn(this), this.scrollTo(e.scrollLeft, e.scrollTop), mi(this, "swapDoc", this, n), n
		})),
		getInputField: function() {
			return this.display.input
		},
		getWrapperElement: function() {
			return this.display.wrapper
		},
		getScrollerElement: function() {
			return this.display.scroller
		},
		getGutterElement: function() {
			return this.display.gutters
		}
	}, wi(S);
	var xt = S.defaults = {},
		St = S.optionHandlers = {};

	function Mt(e, n, t, r) {
		S.defaults[e] = n, t && (St[e] = r ? function(e, n, r) {
			r != Et && t(e, n, r)
		} : t)
	}
	var Et = S.Init = {
		toString: function() {
			return "CodeMirror.Init"
		}
	};
	Mt("value", "", (function(e, n) {
		e.setValue(n)
	}), !0), Mt("mode", null, (function(e, n) {
		e.doc.modeOption = n, E(e)
	}), !0), Mt("indentUnit", 2, E, !0), Mt("indentWithTabs", !1), Mt("smartIndent", !0), Mt("tabSize", 4, (function(e) {
		R(e), Je(e), wn(e)
	}), !0), Mt("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, (function(e, n) {
		e.options.specialChars = new RegExp(n.source + (n.test("\t") ? "" : "|\t"), "g"), e.refresh()
	}), !0), Mt("specialCharPlaceholder", (function(e) {
		var n = Gi("span", "•", "cm-invalidchar");
		return n.title = "\\u" + e.charCodeAt(0).toString(16), n
	}), (function(e) {
		e.refresh()
	}), !0), Mt("electricChars", !0), Mt("rtlMoveVisually", !b), Mt("wholeLineUpdateBefore", !0), Mt("theme", "default", (function(e) {
		O(e), A(e)
	}), !0), Mt("keyMap", "default", I), Mt("extraKeys", null), Mt("lineWrapping", !1, (function(e) {
		e.options.lineWrapping ? (e.display.wrapper.className += " CodeMirror-wrap", e.display.sizer.style.minWidth = "") : (e.display.wrapper.className = e.display.wrapper.className.replace(" CodeMirror-wrap", ""), B(e)), L(e), wn(e), Je(e), setTimeout((function() {
			j(e)
		}), 100)
	}), !0), Mt("gutters", [], (function(e) {
		P(e.options), A(e)
	}), !0), Mt("fixedGutter", !0, (function(e, n) {
		e.display.gutters.style.left = n ? U(e.display) + "px" : "0", e.refresh()
	}), !0), Mt("coverGutterNextToScrollbar", !1, j, !0), Mt("lineNumbers", !1, (function(e) {
		P(e.options), A(e)
	}), !0), Mt("firstLineNumber", 1, A, !0), Mt("lineNumberFormatter", (function(e) {
		return e
	}), A, !0), Mt("showCursorWhenSelecting", !1, Ie, !0), Mt("resetSelectionOnContextMenu", !0), Mt("readOnly", !1, (function(e, n) {
		"nocursor" == n ? (nt(e), e.display.input.blur(), e.display.disabled = !0) : (e.display.disabled = !1, n || Tn(e))
	})), Mt("disableInput", !1, (function(e, n) {
		n || Tn(e)
	}), !0), Mt("dragDrop", !0), Mt("cursorBlinkRate", 530), Mt("cursorScrollMargin", 0), Mt("cursorHeight", 1), Mt("workTime", 100), Mt("workDelay", 100), Mt("flattenSpans", !0, R, !0), Mt("addModeClass", !1, R, !0), Mt("pollInterval", 100), Mt("undoDepth", 200, (function(e, n) {
		e.doc.history.undoDepth = n
	})), Mt("historyEventDelay", 1250), Mt("viewportMargin", 10, (function(e) {
		e.refresh()
	}), !0), Mt("maxHighlightLength", 1e4, R, !0), Mt("moveInputWithCursor", !0, (function(e, n) {
		n || (e.display.inputDiv.style.top = e.display.inputDiv.style.left = 0)
	})), Mt("tabindex", null, (function(e, n) {
		e.display.input.tabIndex = n || ""
	})), Mt("autofocus", null);
	var Rt = S.modes = {},
		Tt = S.mimeModes = {};
	S.defineMode = function(e, n) {
		if (S.defaults.mode || "null" == e || (S.defaults.mode = e), arguments.length > 2) {
			n.dependencies = [];
			for (var t = 2; t < arguments.length; ++t) n.dependencies.push(arguments[t])
		}
		Rt[e] = n
	}, S.defineMIME = function(e, n) {
		Tt[e] = n
	}, S.resolveMode = function(e) {
		if ("string" == typeof e && Tt.hasOwnProperty(e)) e = Tt[e];
		else if (e && "string" == typeof e.name && Tt.hasOwnProperty(e.name)) {
			var n = Tt[e.name];
			"string" == typeof n && (n = {
				name: n
			}), (e = Ni(n, e)).name = n.name
		} else if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return S.resolveMode("application/xml");
		return "string" == typeof e ? {
			name: e
		} : e || {
			name: "null"
		}
	}, S.getMode = function(e, n) {
		n = S.resolveMode(n);
		var t = Rt[n.name];
		if (!t) return S.getMode(e, "text/plain");
		var r = t(e, n);
		if (Lt.hasOwnProperty(n.name)) {
			var i = Lt[n.name];
			for (var o in i) i.hasOwnProperty(o) && (r.hasOwnProperty(o) && (r["_" + o] = r[o]), r[o] = i[o])
		}
		if (r.name = n.name, n.helperType && (r.helperType = n.helperType), n.modeProps)
			for (var o in n.modeProps) r[o] = n.modeProps[o];
		return r
	}, S.defineMode("null", (function() {
		return {
			token: function(e) {
				e.skipToEnd()
			}
		}
	})), S.defineMIME("text/plain", "null");
	var Lt = S.modeExtensions = {};
	S.extendMode = function(e, n) {
		Bi(n, Lt.hasOwnProperty(e) ? Lt[e] : Lt[e] = {})
	}, S.defineExtension = function(e, n) {
		S.prototype[e] = n
	}, S.defineDocExtension = function(e, n) {
		Nr.prototype[e] = n
	}, S.defineOption = Mt;
	var It = [];
	S.defineInitHook = function(e) {
		It.push(e)
	};
	var Ot = S.helpers = {};
	S.registerHelper = function(e, n, t) {
		Ot.hasOwnProperty(e) || (Ot[e] = S[e] = {
			_global: []
		}), Ot[e][n] = t
	}, S.registerGlobalHelper = function(e, n, t, r) {
		S.registerHelper(e, n, r), Ot[e]._global.push({
			pred: t,
			val: r
		})
	};
	var At = S.copyState = function(e, n) {
			if (!0 === n) return n;
			if (e.copyState) return e.copyState(n);
			var t = {};
			for (var r in n) {
				var i = n[r];
				i instanceof Array && (i = i.concat([])), t[r] = i
			}
			return t
		},
		Dt = S.startState = function(e, n, t) {
			return !e.startState || e.startState(n, t)
		};
	S.innerMode = function(e, n) {
		for (; e.innerMode;) {
			var t = e.innerMode(n);
			if (!t || t.mode == e) break;
			n = t.state, e = t.mode
		}
		return t || {
			mode: e,
			state: n
		}
	};
	var Nt = S.commands = {
			selectAll: function(e) {
				e.setSelection(le(e.firstLine(), 0), le(e.lastLine()), ki)
			},
			singleSelection: function(e) {
				e.setSelection(e.getCursor("anchor"), e.getCursor("head"), ki)
			},
			killLine: function(e) {
				wt(e, (function(n) {
					if (n.empty()) {
						var t = Hr(e.doc, n.head.line).text.length;
						return n.head.ch == t && n.head.line < e.lastLine() ? {
							from: n.head,
							to: le(n.head.line + 1, 0)
						} : {
							from: n.head,
							to: le(n.head.line, t)
						}
					}
					return {
						from: n.from(),
						to: n.to()
					}
				}))
			},
			deleteLine: function(e) {
				wt(e, (function(n) {
					return {
						from: le(n.from().line, 0),
						to: ve(e.doc, le(n.to().line + 1, 0))
					}
				}))
			},
			delLineLeft: function(e) {
				wt(e, (function(e) {
					return {
						from: le(e.from().line, 0),
						to: e.from()
					}
				}))
			},
			undo: function(e) {
				e.undo()
			},
			redo: function(e) {
				e.redo()
			},
			undoSelection: function(e) {
				e.undoSelection()
			},
			redoSelection: function(e) {
				e.redoSelection()
			},
			goDocStart: function(e) {
				e.extendSelection(le(e.firstLine(), 0))
			},
			goDocEnd: function(e) {
				e.extendSelection(le(e.lastLine()))
			},
			goLineStart: function(e) {
				e.extendSelectionsBy((function(n) {
					return go(e, n.head.line)
				}), Si)
			},
			goLineStartSmart: function(e) {
				e.extendSelectionsBy((function(n) {
					var t = go(e, n.head.line),
						r = e.getLineHandle(t.line),
						i = Xr(r);
					if (!i || 0 == i[0].level) {
						var o = Math.max(0, r.text.search(/\S/)),
							a = n.head.line == t.line && n.head.ch <= o && n.head.ch;
						return le(t.line, a ? 0 : o)
					}
					return t
				}), Si)
			},
			goLineEnd: function(e) {
				e.extendSelectionsBy((function(n) {
					return function(e, n) {
						var t, r = Hr(e.doc, n);
						for (; t = or(r);) r = t.find(1, !0).line, n = null;
						var i = Xr(r),
							o = i ? i[0].level % 2 ? fo(r) : po(r) : r.text.length;
						return le(null == n ? Vr(r) : n, o)
					}(e, n.head.line)
				}), Si)
			},
			goLineRight: function(e) {
				e.extendSelectionsBy((function(n) {
					var t = e.charCoords(n.head, "div").top + 5;
					return e.coordsChar({
						left: e.display.lineDiv.offsetWidth + 100,
						top: t
					}, "div")
				}), Si)
			},
			goLineLeft: function(e) {
				e.extendSelectionsBy((function(n) {
					var t = e.charCoords(n.head, "div").top + 5;
					return e.coordsChar({
						left: 0,
						top: t
					}, "div")
				}), Si)
			},
			goLineUp: function(e) {
				e.moveV(-1, "line")
			},
			goLineDown: function(e) {
				e.moveV(1, "line")
			},
			goPageUp: function(e) {
				e.moveV(-1, "page")
			},
			goPageDown: function(e) {
				e.moveV(1, "page")
			},
			goCharLeft: function(e) {
				e.moveH(-1, "char")
			},
			goCharRight: function(e) {
				e.moveH(1, "char")
			},
			goColumnLeft: function(e) {
				e.moveH(-1, "column")
			},
			goColumnRight: function(e) {
				e.moveH(1, "column")
			},
			goWordLeft: function(e) {
				e.moveH(-1, "word")
			},
			goGroupRight: function(e) {
				e.moveH(1, "group")
			},
			goGroupLeft: function(e) {
				e.moveH(-1, "group")
			},
			goWordRight: function(e) {
				e.moveH(1, "word")
			},
			delCharBefore: function(e) {
				e.deleteH(-1, "char")
			},
			delCharAfter: function(e) {
				e.deleteH(1, "char")
			},
			delWordBefore: function(e) {
				e.deleteH(-1, "word")
			},
			delWordAfter: function(e) {
				e.deleteH(1, "word")
			},
			delGroupBefore: function(e) {
				e.deleteH(-1, "group")
			},
			delGroupAfter: function(e) {
				e.deleteH(1, "group")
			},
			indentAuto: function(e) {
				e.indentSelection("smart")
			},
			indentMore: function(e) {
				e.indentSelection("add")
			},
			indentLess: function(e) {
				e.indentSelection("subtract")
			},
			insertTab: function(e) {
				e.replaceSelection("\t")
			},
			defaultTab: function(e) {
				e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
			},
			transposeChars: function(e) {
				pn(e, (function() {
					for (var n = e.listSelections(), t = 0; t < n.length; t++) {
						var r = n[t].head,
							i = Hr(e.doc, r.line).text;
						r.ch > 0 && r.ch < i.length - 1 && e.replaceRange(i.charAt(r.ch) + i.charAt(r.ch - 1), le(r.line, r.ch - 1), le(r.line, r.ch + 1))
					}
				}))
			},
			newlineAndIndent: function(e) {
				pn(e, (function() {
					for (var n = e.listSelections().length, t = 0; t < n; t++) {
						var r = e.listSelections()[t];
						e.replaceRange("\n", r.anchor, r.head, "+input"), e.indentLine(r.from().line + 1, null, !0), mt(e)
					}
				}))
			},
			toggleOverwrite: function(e) {
				e.toggleOverwrite()
			}
		},
		Bt = S.keyMap = {};

	function Pt(e) {
		return "string" == typeof e ? Bt[e] : e
	}
	Bt.basic = {
		Left: "goCharLeft",
		Right: "goCharRight",
		Up: "goLineUp",
		Down: "goLineDown",
		End: "goLineEnd",
		Home: "goLineStartSmart",
		PageUp: "goPageUp",
		PageDown: "goPageDown",
		Delete: "delCharAfter",
		Backspace: "delCharBefore",
		"Shift-Backspace": "delCharBefore",
		Tab: "defaultTab",
		"Shift-Tab": "indentAuto",
		Enter: "newlineAndIndent",
		Insert: "toggleOverwrite",
		Esc: "singleSelection"
	}, Bt.pcDefault = {
		"Ctrl-A": "selectAll",
		"Ctrl-D": "deleteLine",
		"Ctrl-Z": "undo",
		"Shift-Ctrl-Z": "redo",
		"Ctrl-Y": "redo",
		"Ctrl-Home": "goDocStart",
		"Ctrl-Up": "goDocStart",
		"Ctrl-End": "goDocEnd",
		"Ctrl-Down": "goDocEnd",
		"Ctrl-Left": "goGroupLeft",
		"Ctrl-Right": "goGroupRight",
		"Alt-Left": "goLineStart",
		"Alt-Right": "goLineEnd",
		"Ctrl-Backspace": "delGroupBefore",
		"Ctrl-Delete": "delGroupAfter",
		"Ctrl-S": "save",
		"Ctrl-F": "find",
		"Ctrl-G": "findNext",
		"Shift-Ctrl-G": "findPrev",
		"Shift-Ctrl-F": "replace",
		"Shift-Ctrl-R": "replaceAll",
		"Ctrl-[": "indentLess",
		"Ctrl-]": "indentMore",
		"Ctrl-U": "undoSelection",
		"Shift-Ctrl-U": "redoSelection",
		"Alt-U": "redoSelection",
		fallthrough: "basic"
	}, Bt.macDefault = {
		"Cmd-A": "selectAll",
		"Cmd-D": "deleteLine",
		"Cmd-Z": "undo",
		"Shift-Cmd-Z": "redo",
		"Cmd-Y": "redo",
		"Cmd-Up": "goDocStart",
		"Cmd-End": "goDocEnd",
		"Cmd-Down": "goDocEnd",
		"Alt-Left": "goGroupLeft",
		"Alt-Right": "goGroupRight",
		"Cmd-Left": "goLineStart",
		"Cmd-Right": "goLineEnd",
		"Alt-Backspace": "delGroupBefore",
		"Ctrl-Alt-Backspace": "delGroupAfter",
		"Alt-Delete": "delGroupAfter",
		"Cmd-S": "save",
		"Cmd-F": "find",
		"Cmd-G": "findNext",
		"Shift-Cmd-G": "findPrev",
		"Cmd-Alt-F": "replace",
		"Shift-Cmd-Alt-F": "replaceAll",
		"Cmd-[": "indentLess",
		"Cmd-]": "indentMore",
		"Cmd-Backspace": "delLineLeft",
		"Cmd-U": "undoSelection",
		"Shift-Cmd-U": "redoSelection",
		fallthrough: ["basic", "emacsy"]
	}, Bt.emacsy = {
		"Ctrl-F": "goCharRight",
		"Ctrl-B": "goCharLeft",
		"Ctrl-P": "goLineUp",
		"Ctrl-N": "goLineDown",
		"Alt-F": "goWordRight",
		"Alt-B": "goWordLeft",
		"Ctrl-A": "goLineStart",
		"Ctrl-E": "goLineEnd",
		"Ctrl-V": "goPageDown",
		"Shift-Ctrl-V": "goPageUp",
		"Ctrl-D": "delCharAfter",
		"Ctrl-H": "delCharBefore",
		"Alt-D": "delWordAfter",
		"Alt-Backspace": "delWordBefore",
		"Ctrl-K": "killLine",
		"Ctrl-T": "transposeChars"
	}, Bt.default = y ? Bt.macDefault : Bt.pcDefault;
	var Ft = S.lookupKey = function(e, n, t) {
			function r(n) {
				var i = (n = Pt(n))[e];
				if (!1 === i) return "stop";
				if (null != i && t(i)) return !0;
				if (n.nofallthrough) return "stop";
				var o = n.fallthrough;
				if (null == o) return !1;
				if ("[object Array]" != Object.prototype.toString.call(o)) return r(o);
				for (var a = 0; a < o.length; ++a) {
					var l = r(o[a]);
					if (l) return l
				}
				return !1
			}
			for (var i = 0; i < n.length; ++i) {
				var o = r(n[i]);
				if (o) return "stop" != o
			}
		},
		jt = S.isModifierKey = function(e) {
			var n = co[e.keyCode];
			return "Ctrl" == n || "Alt" == n || "Shift" == n || "Mod" == n
		},
		Ht = S.keyName = function(e, n) {
			if (u && 34 == e.keyCode && e.char) return !1;
			var t = co[e.keyCode];
			return null != t && !e.altGraphKey && (e.altKey && (t = "Alt-" + t), (_ ? e.metaKey : e.ctrlKey) && (t = "Ctrl-" + t), (_ ? e.ctrlKey : e.metaKey) && (t = "Cmd-" + t), !n && e.shiftKey && (t = "Shift-" + t), t)
		};
	S.fromTextArea = function(e, n) {
		if (n || (n = {}), n.value = e.value, !n.tabindex && e.tabindex && (n.tabindex = e.tabindex), !n.placeholder && e.placeholder && (n.placeholder = e.placeholder), null == n.autofocus) {
			var t = Ki();
			n.autofocus = t == e || null != e.getAttribute("autofocus") && t == document.body
		}

		function r() {
			e.value = l.getValue()
		}
		if (e.form && (hi(e.form, "submit", r), !n.leaveSubmitMethodAlone)) {
			var i = e.form,
				o = i.submit;
			try {
				var a = i.submit = function() {
					r(), i.submit = o, i.submit(), i.submit = a
				}
			} catch (e) {}
		}
		e.style.display = "none";
		var l = S((function(n) {
			e.parentNode.insertBefore(n, e.nextSibling)
		}), n);
		return l.save = r, l.getTextArea = function() {
			return e
		}, l.toTextArea = function() {
			r(), e.parentNode.removeChild(l.getWrapperElement()), e.style.display = "", e.form && (fi(e.form, "submit", r), "function" == typeof e.form.submit && (e.form.submit = o))
		}, l
	};
	var zt = S.StringStream = function(e, n) {
		this.pos = this.start = 0, this.string = e, this.tabSize = n || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0
	};
	zt.prototype = {
		eol: function() {
			return this.pos >= this.string.length
		},
		sol: function() {
			return this.pos == this.lineStart
		},
		peek: function() {
			return this.string.charAt(this.pos) || void 0
		},
		next: function() {
			if (this.pos < this.string.length) return this.string.charAt(this.pos++)
		},
		eat: function(e) {
			var n = this.string.charAt(this.pos);
			if ("string" == typeof e) var t = n == e;
			else t = n && (e.test ? e.test(n) : e(n));
			if (t) return ++this.pos, n
		},
		eatWhile: function(e) {
			for (var n = this.pos; this.eat(e););
			return this.pos > n
		},
		eatSpace: function() {
			for (var e = this.pos;
				/[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
			return this.pos > e
		},
		skipToEnd: function() {
			this.pos = this.string.length
		},
		skipTo: function(e) {
			var n = this.string.indexOf(e, this.pos);
			if (n > -1) return this.pos = n, !0
		},
		backUp: function(e) {
			this.pos -= e
		},
		column: function() {
			return this.lastColumnPos < this.start && (this.lastColumnValue = Ei(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? Ei(this.string, this.lineStart, this.tabSize) : 0)
		},
		indentation: function() {
			return Ei(this.string, null, this.tabSize) - (this.lineStart ? Ei(this.string, this.lineStart, this.tabSize) : 0)
		},
		match: function(e, n, t) {
			if ("string" != typeof e) {
				var r = this.string.slice(this.pos).match(e);
				return r && r.index > 0 ? null : (r && !1 !== n && (this.pos += r[0].length), r)
			}
			var i = function(e) {
				return t ? e.toLowerCase() : e
			};
			if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== n && (this.pos += e.length), !0
		},
		current: function() {
			return this.string.slice(this.start, this.pos)
		},
		hideFirstChars: function(e, n) {
			this.lineStart += e;
			try {
				return n()
			} finally {
				this.lineStart -= e
			}
		}
	};
	var Wt = S.TextMarker = function(e, n) {
		this.lines = [], this.type = n, this.doc = e
	};
	wi(Wt), Wt.prototype.clear = function() {
		if (!this.explicitlyCleared) {
			var e = this.doc.cm,
				n = e && !e.curOp;
			if (n && hn(e), bi(this, "clear")) {
				var t = this.find();
				t && mi(this, "clear", t.from, t.to)
			}
			for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
				var a = this.lines[o],
					l = Xt(a.markedSpans, this);
				e && !this.collapsed ? _n(e, Vr(a), "text") : e && (null != l.to && (i = Vr(a)), null != l.from && (r = Vr(a))), a.markedSpans = Yt(a.markedSpans, l), null == l.from && this.collapsed && !ur(this.doc, a) && e && Ur(a, ln(e.display))
			}
			if (e && this.collapsed && !e.options.lineWrapping)
				for (o = 0; o < this.lines.length; ++o) {
					var s = lr(this.lines[o]),
						c = N(s);
					c > e.display.maxLineLength && (e.display.maxLine = s, e.display.maxLineLength = c, e.display.maxLineChanged = !0)
				}
			null != r && e && this.collapsed && wn(e, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Re(e.doc)), e && mi(e, "markerCleared", e, this), n && fn(e)
		}
	}, Wt.prototype.find = function(e, n) {
		var t, r;
		null == e && "bookmark" == this.type && (e = 1);
		for (var i = 0; i < this.lines.length; ++i) {
			var o = this.lines[i],
				a = Xt(o.markedSpans, this);
			if (null != a.from && (t = le(n ? o : Vr(o), a.from), -1 == e)) return t;
			if (null != a.to && (r = le(n ? o : Vr(o), a.to), 1 == e)) return r
		}
		return t && {
			from: t,
			to: r
		}
	}, Wt.prototype.changed = function() {
		var e = this.find(-1, !0),
			n = this,
			t = this.doc.cm;
		e && t && pn(t, (function() {
			var r = e.line,
				i = Vr(e.line),
				o = We(t, i);
			if (o && (Xe(o), t.curOp.selectionChanged = t.curOp.forceUpdate = !0), t.curOp.updateMaxLine = !0, !ur(n.doc, r) && null != n.height) {
				var a = n.height;
				n.height = null;
				var l = pr(n) - a;
				l && Ur(r, r.height + l)
			}
		}))
	}, Wt.prototype.attachLine = function(e) {
		if (!this.lines.length && this.doc.cm) {
			var n = this.doc.cm.curOp;
			n.maybeHiddenMarkers && -1 != Ai(n.maybeHiddenMarkers, this) || (n.maybeUnhiddenMarkers || (n.maybeUnhiddenMarkers = [])).push(this)
		}
		this.lines.push(e)
	}, Wt.prototype.detachLine = function(e) {
		if (this.lines.splice(Ai(this.lines, e), 1), !this.lines.length && this.doc.cm) {
			var n = this.doc.cm.curOp;
			(n.maybeHiddenMarkers || (n.maybeHiddenMarkers = [])).push(this)
		}
	};
	var Ut = 0;

	function Vt(e, n, t, r, i) {
		if (r && r.shared) return function(e, n, t, r, i) {
			r = Bi(r), r.shared = !1;
			var o = [Vt(e, n, t, r, i)],
				a = o[0],
				l = r.widgetNode;
			return Fr(e, (function(e) {
				l && (r.widgetNode = l.cloneNode(!0)), o.push(Vt(e, ve(e, n), ve(e, t), r, i));
				for (var s = 0; s < e.linked.length; ++s)
					if (e.linked[s].isParent) return;
				a = Ii(o)
			})), new qt(o, a)
		}(e, n, t, r, i);
		if (e.cm && !e.cm.curOp) return gn(e.cm, Vt)(e, n, t, r, i);
		var o = new Wt(e, i),
			a = se(n, t);
		if (r && Bi(r, o), a > 0 || 0 == a && !1 !== o.clearWhenEmpty) return o;
		if (o.replacedWith && (o.collapsed = !0, o.widgetNode = Gi("span", [o.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || (o.widgetNode.ignoreEvents = !0), r.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
			if (ar(e, n.line, n, t, o) || n.line != t.line && ar(e, t.line, n, t, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
			x = !0
		}
		o.addToHistory && $r(e, {
			from: n,
			to: t,
			origin: "markText"
		}, e.sel, NaN);
		var l, s = n.line,
			c = e.cm;
		if (e.iter(s, t.line + 1, (function(e) {
				c && o.collapsed && !c.options.lineWrapping && lr(e) == c.display.maxLine && (l = !0), o.collapsed && s != n.line && Ur(e, 0),
					function(e, n) {
						e.markedSpans = e.markedSpans ? e.markedSpans.concat([n]) : [n], n.marker.attachLine(e)
					}(e, new Gt(o, s == n.line ? n.ch : null, s == t.line ? t.ch : null)), ++s
			})), o.collapsed && e.iter(n.line, t.line + 1, (function(n) {
				ur(e, n) && Ur(n, 0)
			})), o.clearOnEnter && hi(o, "beforeCursorEnter", (function() {
				o.clear()
			})), o.readOnly && (k = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++Ut, o.atomic = !0), c) {
			if (l && (c.curOp.updateMaxLine = !0), o.collapsed) wn(c, n.line, t.line + 1);
			else if (o.className || o.title || o.startStyle || o.endStyle)
				for (var u = n.line; u <= t.line; u++) _n(c, u, "text");
			o.atomic && Re(c.doc), mi(c, "markerAdded", c, o)
		}
		return o
	}
	var qt = S.SharedTextMarker = function(e, n) {
		this.markers = e, this.primary = n;
		for (var t = 0, r = this; t < e.length; ++t) e[t].parent = this, hi(e[t], "clear", (function() {
			r.clear()
		}))
	};

	function Gt(e, n, t) {
		this.marker = e, this.from = n, this.to = t
	}

	function Xt(e, n) {
		if (e)
			for (var t = 0; t < e.length; ++t) {
				var r = e[t];
				if (r.marker == n) return r
			}
	}

	function Yt(e, n) {
		for (var t, r = 0; r < e.length; ++r) e[r] != n && (t || (t = [])).push(e[r]);
		return t
	}

	function Jt(e, n) {
		var t = ye(e, n.from.line) && Hr(e, n.from.line).markedSpans,
			r = ye(e, n.to.line) && Hr(e, n.to.line).markedSpans;
		if (!t && !r) return null;
		var i = n.from.ch,
			o = n.to.ch,
			a = 0 == se(n.from, n.to),
			l = function(e, n, t) {
				if (e)
					for (var r, i = 0; i < e.length; ++i) {
						var o = e[i],
							a = o.marker;
						if (null == o.from || (a.inclusiveLeft ? o.from <= n : o.from < n) || o.from == n && "bookmark" == a.type && (!t || !o.marker.insertLeft)) {
							var l = null == o.to || (a.inclusiveRight ? o.to >= n : o.to > n);
							(r || (r = [])).push(new Gt(a, o.from, l ? null : o.to))
						}
					}
				return r
			}(t, i, a),
			s = function(e, n, t) {
				if (e)
					for (var r, i = 0; i < e.length; ++i) {
						var o = e[i],
							a = o.marker;
						if (null == o.to || (a.inclusiveRight ? o.to >= n : o.to > n) || o.from == n && "bookmark" == a.type && (!t || o.marker.insertLeft)) {
							var l = null == o.from || (a.inclusiveLeft ? o.from <= n : o.from < n);
							(r || (r = [])).push(new Gt(a, l ? null : o.from - n, null == o.to ? null : o.to - n))
						}
					}
				return r
			}(r, o, a),
			c = 1 == n.text.length,
			u = Ii(n.text).length + (c ? i : 0);
		if (l)
			for (var d = 0; d < l.length; ++d) {
				if (null == (h = l[d]).to)(f = Xt(s, h.marker)) ? c && (h.to = null == f.to ? null : f.to + u) : h.to = i
			}
		if (s)
			for (d = 0; d < s.length; ++d) {
				var h, f;
				if (null != (h = s[d]).to && (h.to += u), null == h.from)(f = Xt(l, h.marker)) || (h.from = u, c && (l || (l = [])).push(h));
				else h.from += u, c && (l || (l = [])).push(h)
			}
		l && (l = Kt(l)), s && s != l && (s = Kt(s));
		var p = [l];
		if (!c) {
			var g, m = n.text.length - 2;
			if (m > 0 && l)
				for (d = 0; d < l.length; ++d) null == l[d].to && (g || (g = [])).push(new Gt(l[d].marker, null, null));
			for (d = 0; d < m; ++d) p.push(g);
			p.push(s)
		}
		return p
	}

	function Kt(e) {
		for (var n = 0; n < e.length; ++n) {
			var t = e[n];
			null != t.from && t.from == t.to && !1 !== t.marker.clearWhenEmpty && e.splice(n--, 1)
		}
		return e.length ? e : null
	}

	function $t(e, n) {
		var t = function(e, n) {
				var t = n["spans_" + e.id];
				if (!t) return null;
				for (var r = 0, i = []; r < n.text.length; ++r) i.push(ei(t[r]));
				return i
			}(e, n),
			r = Jt(e, n);
		if (!t) return r;
		if (!r) return t;
		for (var i = 0; i < t.length; ++i) {
			var o = t[i],
				a = r[i];
			if (o && a) e: for (var l = 0; l < a.length; ++l) {
				for (var s = a[l], c = 0; c < o.length; ++c)
					if (o[c].marker == s.marker) continue e;
				o.push(s)
			} else a && (t[i] = a)
		}
		return t
	}

	function Qt(e) {
		var n = e.markedSpans;
		if (n) {
			for (var t = 0; t < n.length; ++t) n[t].marker.detachLine(e);
			e.markedSpans = null
		}
	}

	function Zt(e, n) {
		if (n) {
			for (var t = 0; t < n.length; ++t) n[t].marker.attachLine(e);
			e.markedSpans = n
		}
	}

	function er(e) {
		return e.inclusiveLeft ? -1 : 0
	}

	function nr(e) {
		return e.inclusiveRight ? 1 : 0
	}

	function tr(e, n) {
		var t = e.lines.length - n.lines.length;
		if (0 != t) return t;
		var r = e.find(),
			i = n.find(),
			o = se(r.from, i.from) || er(e) - er(n);
		if (o) return -o;
		var a = se(r.to, i.to) || nr(e) - nr(n);
		return a || n.id - e.id
	}

	function rr(e, n) {
		var t, r = x && e.markedSpans;
		if (r)
			for (var i, o = 0; o < r.length; ++o)(i = r[o]).marker.collapsed && null == (n ? i.from : i.to) && (!t || tr(t, i.marker) < 0) && (t = i.marker);
		return t
	}

	function ir(e) {
		return rr(e, !0)
	}

	function or(e) {
		return rr(e, !1)
	}

	function ar(e, n, t, r, i) {
		var o = Hr(e, n),
			a = x && o.markedSpans;
		if (a)
			for (var l = 0; l < a.length; ++l) {
				var s = a[l];
				if (s.marker.collapsed) {
					var c = s.marker.find(0),
						u = se(c.from, t) || er(s.marker) - er(i),
						d = se(c.to, r) || nr(s.marker) - nr(i);
					if (!(u >= 0 && d <= 0 || u <= 0 && d >= 0) && (u <= 0 && (se(c.to, t) || nr(s.marker) - er(i)) > 0 || u >= 0 && (se(c.from, r) || er(s.marker) - nr(i)) < 0)) return !0
				}
			}
	}

	function lr(e) {
		for (var n; n = ir(e);) e = n.find(-1, !0).line;
		return e
	}

	function sr(e, n) {
		var t = Hr(e, n),
			r = lr(t);
		return t == r ? n : Vr(r)
	}

	function cr(e, n) {
		if (n > e.lastLine()) return n;
		var t, r = Hr(e, n);
		if (!ur(e, r)) return n;
		for (; t = or(r);) r = t.find(1, !0).line;
		return Vr(r) + 1
	}

	function ur(e, n) {
		var t = x && n.markedSpans;
		if (t)
			for (var r, i = 0; i < t.length; ++i)
				if ((r = t[i]).marker.collapsed) {
					if (null == r.from) return !0;
					if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && dr(e, n, r)) return !0
				}
	}

	function dr(e, n, t) {
		if (null == t.to) {
			var r = t.marker.find(1, !0);
			return dr(e, r.line, Xt(r.line.markedSpans, t.marker))
		}
		if (t.marker.inclusiveRight && t.to == n.text.length) return !0;
		for (var i, o = 0; o < n.markedSpans.length; ++o)
			if ((i = n.markedSpans[o]).marker.collapsed && !i.marker.widgetNode && i.from == t.to && (null == i.to || i.to != t.from) && (i.marker.inclusiveLeft || t.marker.inclusiveRight) && dr(e, n, i)) return !0
	}
	wi(qt), qt.prototype.clear = function() {
		if (!this.explicitlyCleared) {
			this.explicitlyCleared = !0;
			for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
			mi(this, "clear")
		}
	}, qt.prototype.find = function(e, n) {
		return this.primary.find(e, n)
	};
	var hr = S.LineWidget = function(e, n, t) {
		if (t)
			for (var r in t) t.hasOwnProperty(r) && (this[r] = t[r]);
		this.cm = e, this.node = n
	};

	function fr(e, n, t) {
		Gr(n) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && gt(e, null, t)
	}

	function pr(e) {
		return null != e.height ? e.height : (Ji(document.body, e.node) || Yi(e.cm.display.measure, Gi("div", [e.node], null, "position: relative")), e.height = e.node.offsetHeight)
	}
	wi(hr), hr.prototype.clear = function() {
		var e = this.cm,
			n = this.line.widgets,
			t = this.line,
			r = Vr(t);
		if (null != r && n) {
			for (var i = 0; i < n.length; ++i) n[i] == this && n.splice(i--, 1);
			n.length || (t.widgets = null);
			var o = pr(this);
			pn(e, (function() {
				fr(e, t, -o), _n(e, r, "widget"), Ur(t, Math.max(0, t.height - o))
			}))
		}
	}, hr.prototype.changed = function() {
		var e = this.height,
			n = this.cm,
			t = this.line;
		this.height = null;
		var r = pr(this) - e;
		r && pn(n, (function() {
			n.curOp.forceUpdate = !0, fr(n, t, r), Ur(t, t.height + r)
		}))
	};
	var gr = S.Line = function(e, n, t) {
		this.text = e, Zt(this, n), this.height = t ? t(this) : 1
	};

	function mr(e) {
		e.parent = null, Qt(e)
	}

	function vr(e, n, t, r, i, o) {
		var a = t.flattenSpans;
		null == a && (a = e.options.flattenSpans);
		var l, s = 0,
			c = null,
			u = new zt(n, e.options.tabSize);
		for ("" == n && t.blankLine && t.blankLine(r); !u.eol();) {
			if (u.pos > e.options.maxHighlightLength ? (a = !1, o && wr(e, n, r, u.pos), u.pos = n.length, l = null) : l = t.token(u, r), e.options.addModeClass) {
				var d = S.innerMode(t, r).mode.name;
				d && (l = "m-" + (l ? d + " " + l : d))
			}
			a && c == l || (s < u.start && i(u.start, c), s = u.start, c = l), u.start = u.pos
		}
		for (; s < u.pos;) {
			var h = Math.min(u.pos, s + 5e4);
			i(h, c), s = h
		}
	}

	function yr(e, n, t, r) {
		var i = [e.state.modeGen];
		vr(e, n.text, e.doc.mode, t, (function(e, n) {
			i.push(e, n)
		}), r);
		for (var o = 0; o < e.state.overlays.length; ++o) {
			var a = e.state.overlays[o],
				l = 1,
				s = 0;
			vr(e, n.text, a.mode, !0, (function(e, n) {
				for (var t = l; s < e;) {
					var r = i[l];
					r > e && i.splice(l, 1, e, i[l + 1], r), l += 2, s = Math.min(e, r)
				}
				if (n)
					if (a.opaque) i.splice(t, l - t, e, n), l = t + 2;
					else
						for (; t < l; t += 2) {
							var o = i[t + 1];
							i[t + 1] = o ? o + " " + n : n
						}
			}))
		}
		return i
	}

	function br(e, n) {
		return n.styles && n.styles[0] == e.state.modeGen || (n.styles = yr(e, n, n.stateAfter = Pe(e, Vr(n)))), n.styles
	}

	function wr(e, n, t, r) {
		var i = e.doc.mode,
			o = new zt(n, e.options.tabSize);
		for (o.start = o.pos = r || 0, "" == n && i.blankLine && i.blankLine(t); !o.eol() && o.pos <= e.options.maxHighlightLength;) i.token(o, t), o.start = o.pos
	}
	wi(gr), gr.prototype.lineNo = function() {
		return Vr(this)
	};
	var _r = {},
		Cr = {};

	function kr(e, n) {
		if (!e) return null;
		for (;;) {
			var t = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
			if (!t) break;
			e = e.slice(0, t.index) + e.slice(t.index + t[0].length);
			var r = t[1] ? "bgClass" : "textClass";
			null == n[r] ? n[r] = t[2] : new RegExp("(?:^|s)" + t[2] + "(?:$|s)").test(n[r]) || (n[r] += " " + t[2])
		}
		if (/^\s*$/.test(e)) return null;
		var i = n.cm.options.addModeClass ? Cr : _r;
		return i[e] || (i[e] = e.replace(/\S+/g, "cm-$&"))
	}

	function xr(e, n) {
		var t = Gi("span", null, null, l ? "padding-right: .1px" : null),
			r = {
				pre: Gi("pre", [t]),
				content: t,
				col: 0,
				pos: 0,
				cm: e
			};
		n.measure = {};
		for (var i = 0; i <= (n.rest ? n.rest.length : 0); i++) {
			var o, s = i ? n.rest[i - 1] : n.line;
			r.pos = 0, r.addToken = Sr, (a || l) && e.getOption("lineWrapping") && (r.addToken = Mr(r.addToken)), ro(e.display.measure) && (o = Xr(s)) && (r.addToken = Er(r.addToken, o)), r.map = [], Tr(s, r, br(e, s)), 0 == r.map.length && r.map.push(0, 0, r.content.appendChild(to(e.display.measure))), 0 == i ? (n.measure.map = r.map, n.measure.cache = {}) : ((n.measure.maps || (n.measure.maps = [])).push(r.map), (n.measure.caches || (n.measure.caches = [])).push({}))
		}
		return pi(e, "renderLine", e, n.line, r.pre), r
	}

	function Sr(e, n, t, i, o, a) {
		if (n) {
			var l = e.cm.options.specialChars,
				s = !1;
			if (l.test(n)) {
				g = document.createDocumentFragment();
				for (var c = 0;;) {
					l.lastIndex = c;
					var u = l.exec(n),
						d = u ? u.index - c : n.length - c;
					if (d) {
						var h = document.createTextNode(n.slice(c, c + d));
						r ? g.appendChild(Gi("span", [h])) : g.appendChild(h), e.map.push(e.pos, e.pos + d, h), e.col += d, e.pos += d
					}
					if (!u) break;
					if (c += d + 1, "\t" == u[0]) {
						var f = e.cm.options.tabSize,
							p = f - e.col % f;
						h = g.appendChild(Gi("span", Li(p), "cm-tab"));
						e.col += p
					} else {
						h = e.cm.options.specialCharPlaceholder(u[0]);
						r ? g.appendChild(Gi("span", [h])) : g.appendChild(h), e.col += 1
					}
					e.map.push(e.pos, e.pos + 1, h), e.pos++
				}
			} else {
				e.col += n.length;
				var g = document.createTextNode(n);
				e.map.push(e.pos, e.pos + n.length, g), r && (s = !0), e.pos += n.length
			}
			if (t || i || o || s) {
				var m = t || "";
				i && (m += i), o && (m += o);
				var v = Gi("span", [g], m);
				return a && (v.title = a), e.content.appendChild(v)
			}
			e.content.appendChild(g)
		}
	}

	function Mr(e) {
		function n(e) {
			for (var n = " ", t = 0; t < e.length - 2; ++t) n += t % 2 ? " " : " ";
			return n += " "
		}
		return function(t, r, i, o, a, l) {
			e(t, r.replace(/ {3,}/g, n), i, o, a, l)
		}
	}

	function Er(e, n) {
		return function(t, r, i, o, a, l) {
			i = i ? i + " cm-force-border" : "cm-force-border";
			for (var s = t.pos, c = s + r.length;;) {
				for (var u = 0; u < n.length; u++) {
					var d = n[u];
					if (d.to > s && d.from <= s) break
				}
				if (d.to >= c) return e(t, r, i, o, a, l);
				e(t, r.slice(0, d.to - s), i, o, null, l), o = null, r = r.slice(d.to - s), s = d.to
			}
		}
	}

	function Rr(e, n, t, r) {
		var i = !r && t.widgetNode;
		i && (e.map.push(e.pos, e.pos + n, i), e.content.appendChild(i)), e.pos += n
	}

	function Tr(e, n, t) {
		var r = e.markedSpans,
			i = e.text,
			o = 0;
		if (r)
			for (var a, l, s, c, u, d, h = i.length, f = 0, p = (k = 1, ""), g = 0;;) {
				if (g == f) {
					l = s = c = u = "", d = null, g = 1 / 0;
					for (var m = [], v = 0; v < r.length; ++v) {
						var y = r[v],
							b = y.marker;
						y.from <= f && (null == y.to || y.to > f) ? (null != y.to && g > y.to && (g = y.to, s = ""), b.className && (l += " " + b.className), b.startStyle && y.from == f && (c += " " + b.startStyle), b.endStyle && y.to == g && (s += " " + b.endStyle), b.title && !u && (u = b.title), b.collapsed && (!d || tr(d.marker, b) < 0) && (d = y)) : y.from > f && g > y.from && (g = y.from), "bookmark" == b.type && y.from == f && b.widgetNode && m.push(b)
					}
					if (d && (d.from || 0) == f && (Rr(n, (null == d.to ? h + 1 : d.to) - f, d.marker, null == d.from), null == d.to)) return;
					if (!d && m.length)
						for (v = 0; v < m.length; ++v) Rr(n, 0, m[v])
				}
				if (f >= h) break;
				for (var w = Math.min(h, g);;) {
					if (p) {
						var _ = f + p.length;
						if (!d) {
							var C = _ > w ? p.slice(0, w - f) : p;
							n.addToken(n, C, a ? a + l : l, c, f + C.length == g ? s : "", u)
						}
						if (_ >= w) {
							p = p.slice(w - f), f = w;
							break
						}
						f = _, c = ""
					}
					p = i.slice(o, o = t[k++]), a = kr(t[k++], n)
				}
			} else
				for (var k = 1; k < t.length; k += 2) n.addToken(n, i.slice(o, o = t[k]), kr(t[k + 1], n))
	}

	function Lr(e, n) {
		return 0 == n.from.ch && 0 == n.to.ch && "" == Ii(n.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
	}

	function Ir(e, n, t, r) {
		function i(e) {
			return t ? t[e] : null
		}

		function o(e, t, i) {
			! function(e, n, t, r) {
				e.text = n, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), Qt(e), Zt(e, t);
				var i = r ? r(e) : 1;
				i != e.height && Ur(e, i)
			}(e, t, i, r), mi(e, "change", e, n)
		}
		var a = n.from,
			l = n.to,
			s = n.text,
			c = Hr(e, a.line),
			u = Hr(e, l.line),
			d = Ii(s),
			h = i(s.length - 1),
			f = l.line - a.line;
		if (Lr(e, n)) {
			for (var p = 0, g = []; p < s.length - 1; ++p) g.push(new gr(s[p], i(p), r));
			o(u, u.text, h), f && e.remove(a.line, f), g.length && e.insert(a.line, g)
		} else if (c == u)
			if (1 == s.length) o(c, c.text.slice(0, a.ch) + d + c.text.slice(l.ch), h);
			else {
				for (g = [], p = 1; p < s.length - 1; ++p) g.push(new gr(s[p], i(p), r));
				g.push(new gr(d + c.text.slice(l.ch), h, r)), o(c, c.text.slice(0, a.ch) + s[0], i(0)), e.insert(a.line + 1, g)
			}
		else if (1 == s.length) o(c, c.text.slice(0, a.ch) + s[0] + u.text.slice(l.ch), i(0)), e.remove(a.line + 1, f);
		else {
			o(c, c.text.slice(0, a.ch) + s[0], i(0)), o(u, d + u.text.slice(l.ch), h);
			for (p = 1, g = []; p < s.length - 1; ++p) g.push(new gr(s[p], i(p), r));
			f > 1 && e.remove(a.line + 1, f - 1), e.insert(a.line + 1, g)
		}
		mi(e, "change", e, n)
	}

	function Or(e) {
		this.lines = e, this.parent = null;
		for (var n = 0, t = 0; n < e.length; ++n) e[n].parent = this, t += e[n].height;
		this.height = t
	}

	function Ar(e) {
		this.children = e;
		for (var n = 0, t = 0, r = 0; r < e.length; ++r) {
			var i = e[r];
			n += i.chunkSize(), t += i.height, i.parent = this
		}
		this.size = n, this.height = t, this.parent = null
	}
	Or.prototype = {
		chunkSize: function() {
			return this.lines.length
		},
		removeInner: function(e, n) {
			for (var t = e, r = e + n; t < r; ++t) {
				var i = this.lines[t];
				this.height -= i.height, mr(i), mi(i, "delete")
			}
			this.lines.splice(e, n)
		},
		collapse: function(e) {
			e.push.apply(e, this.lines)
		},
		insertInner: function(e, n, t) {
			this.height += t, this.lines = this.lines.slice(0, e).concat(n).concat(this.lines.slice(e));
			for (var r = 0; r < n.length; ++r) n[r].parent = this
		},
		iterN: function(e, n, t) {
			for (var r = e + n; e < r; ++e)
				if (t(this.lines[e])) return !0
		}
	}, Ar.prototype = {
		chunkSize: function() {
			return this.size
		},
		removeInner: function(e, n) {
			this.size -= n;
			for (var t = 0; t < this.children.length; ++t) {
				var r = this.children[t],
					i = r.chunkSize();
				if (e < i) {
					var o = Math.min(n, i - e),
						a = r.height;
					if (r.removeInner(e, o), this.height -= a - r.height, i == o && (this.children.splice(t--, 1), r.parent = null), 0 == (n -= o)) break;
					e = 0
				} else e -= i
			}
			if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof Or))) {
				var l = [];
				this.collapse(l), this.children = [new Or(l)], this.children[0].parent = this
			}
		},
		collapse: function(e) {
			for (var n = 0; n < this.children.length; ++n) this.children[n].collapse(e)
		},
		insertInner: function(e, n, t) {
			this.size += n.length, this.height += t;
			for (var r = 0; r < this.children.length; ++r) {
				var i = this.children[r],
					o = i.chunkSize();
				if (e <= o) {
					if (i.insertInner(e, n, t), i.lines && i.lines.length > 50) {
						for (; i.lines.length > 50;) {
							var a = new Or(i.lines.splice(i.lines.length - 25, 25));
							i.height -= a.height, this.children.splice(r + 1, 0, a), a.parent = this
						}
						this.maybeSpill()
					}
					break
				}
				e -= o
			}
		},
		maybeSpill: function() {
			if (!(this.children.length <= 10)) {
				var e = this;
				do {
					var n = new Ar(e.children.splice(e.children.length - 5, 5));
					if (e.parent) {
						e.size -= n.size, e.height -= n.height;
						var t = Ai(e.parent.children, e);
						e.parent.children.splice(t + 1, 0, n)
					} else {
						var r = new Ar(e.children);
						r.parent = e, e.children = [r, n], e = r
					}
					n.parent = e.parent
				} while (e.children.length > 10);
				e.parent.maybeSpill()
			}
		},
		iterN: function(e, n, t) {
			for (var r = 0; r < this.children.length; ++r) {
				var i = this.children[r],
					o = i.chunkSize();
				if (e < o) {
					var a = Math.min(n, o - e);
					if (i.iterN(e, a, t)) return !0;
					if (0 == (n -= a)) break;
					e = 0
				} else e -= o
			}
		}
	};
	var Dr = 0,
		Nr = S.Doc = function(e, n, t) {
			if (!(this instanceof Nr)) return new Nr(e, n, t);
			null == t && (t = 0), Ar.call(this, [new Or([new gr("", null)])]), this.first = t, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = t;
			var r = le(t, 0);
			this.sel = ge(r), this.history = new Yr(null), this.id = ++Dr, this.modeOption = n, "string" == typeof e && (e = ao(e)), Ir(this, {
				from: r,
				to: r,
				text: e
			}), Se(this, ge(r), ki)
		};
	Nr.prototype = Ni(Ar.prototype, {
		constructor: Nr,
		iter: function(e, n, t) {
			t ? this.iterN(e - this.first, n - e, t) : this.iterN(this.first, this.first + this.size, e)
		},
		insert: function(e, n) {
			for (var t = 0, r = 0; r < n.length; ++r) t += n[r].height;
			this.insertInner(e - this.first, n, t)
		},
		remove: function(e, n) {
			this.removeInner(e - this.first, n)
		},
		getValue: function(e) {
			var n = Wr(this, this.first, this.first + this.size);
			return !1 === e ? n : n.join(e || "\n")
		},
		setValue: vn((function(e) {
			var n = le(this.first, 0),
				t = this.first + this.size - 1;
			st(this, {
				from: n,
				to: le(t, Hr(this, t).text.length),
				text: ao(e),
				origin: "setValue"
			}, !0), Se(this, ge(n))
		})),
		replaceRange: function(e, n, t, r) {
			ft(this, e, n = ve(this, n), t = t ? ve(this, t) : n, r)
		},
		getRange: function(e, n, t) {
			var r = zr(this, ve(this, e), ve(this, n));
			return !1 === t ? r : r.join(t || "\n")
		},
		getLine: function(e) {
			var n = this.getLineHandle(e);
			return n && n.text
		},
		getLineHandle: function(e) {
			if (ye(this, e)) return Hr(this, e)
		},
		getLineNumber: function(e) {
			return Vr(e)
		},
		getLineHandleVisualStart: function(e) {
			return "number" == typeof e && (e = Hr(this, e)), lr(e)
		},
		lineCount: function() {
			return this.size
		},
		firstLine: function() {
			return this.first
		},
		lastLine: function() {
			return this.first + this.size - 1
		},
		clipPos: function(e) {
			return ve(this, e)
		},
		getCursor: function(e) {
			var n = this.sel.primary();
			return null == e || "head" == e ? n.head : "anchor" == e ? n.anchor : "end" == e || "to" == e || !1 === e ? n.to() : n.from()
		},
		listSelections: function() {
			return this.sel.ranges
		},
		somethingSelected: function() {
			return this.sel.somethingSelected()
		},
		setCursor: vn((function(e, n, t) {
			ke(this, ve(this, "number" == typeof e ? le(e, n || 0) : e), null, t)
		})),
		setSelection: vn((function(e, n, t) {
			ke(this, ve(this, e), ve(this, n || e), t)
		})),
		extendSelection: vn((function(e, n, t) {
			we(this, ve(this, e), n && ve(this, n), t)
		})),
		extendSelections: vn((function(e, n) {
			_e(this, function(e, n) {
				for (var t = [], r = 0; r < n.length; r++) t[r] = ve(e, n[r]);
				return t
			}(this, e))
		})),
		extendSelectionsBy: vn((function(e, n) {
			_e(this, Di(this.sel.ranges, e), n)
		})),
		setSelections: vn((function(e, n, t) {
			if (e.length) {
				for (var r = 0, i = []; r < e.length; r++) i[r] = new fe(ve(this, e[r].anchor), ve(this, e[r].head));
				null == n && (n = Math.min(e.length - 1, this.sel.primIndex)), Se(this, pe(i, n), t)
			}
		})),
		addSelection: vn((function(e, n, t) {
			var r = this.sel.ranges.slice(0);
			r.push(new fe(ve(this, e), ve(this, n || e))), Se(this, pe(r, r.length - 1), t)
		})),
		getSelection: function(e) {
			for (var n, t = this.sel.ranges, r = 0; r < t.length; r++) {
				var i = zr(this, t[r].from(), t[r].to());
				n = n ? n.concat(i) : i
			}
			return !1 === e ? n : n.join(e || "\n")
		},
		getSelections: function(e) {
			for (var n = [], t = this.sel.ranges, r = 0; r < t.length; r++) {
				var i = zr(this, t[r].from(), t[r].to());
				!1 !== e && (i = i.join(e || "\n")), n[r] = i
			}
			return n
		},
		replaceSelection: vn((function(e, n, t) {
			for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e;
			this.replaceSelections(r, n, t || "+input")
		})),
		replaceSelections: function(e, n, t) {
			for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
				var a = i.ranges[o];
				r[o] = {
					from: a.from(),
					to: a.to(),
					text: ao(e[o]),
					origin: t
				}
			}
			var l = n && "end" != n && function(e, n, t) {
				for (var r = [], i = le(e.first, 0), o = i, a = 0; a < n.length; a++) {
					var l = n[a],
						s = at(l.from, i, o),
						c = at(rt(l), i, o);
					if (i = l.to, o = c, "around" == t) {
						var u = e.sel.ranges[a],
							d = se(u.head, u.anchor) < 0;
						r[a] = new fe(d ? c : s, d ? s : c)
					} else r[a] = new fe(s, s)
				}
				return new he(r, e.sel.primIndex)
			}(this, r, n);
			for (o = r.length - 1; o >= 0; o--) st(this, r[o]);
			l ? xe(this, l) : this.cm && mt(this.cm)
		},
		undo: vn((function() {
			ut(this, "undo")
		})),
		redo: vn((function() {
			ut(this, "redo")
		})),
		undoSelection: vn((function() {
			ut(this, "undo", !0)
		})),
		redoSelection: vn((function() {
			ut(this, "redo", !0)
		})),
		setExtending: function(e) {
			this.extend = e
		},
		getExtending: function() {
			return this.extend
		},
		historySize: function() {
			for (var e = this.history, n = 0, t = 0, r = 0; r < e.done.length; r++) e.done[r].ranges || ++n;
			for (r = 0; r < e.undone.length; r++) e.undone[r].ranges || ++t;
			return {
				undo: n,
				redo: t
			}
		},
		clearHistory: function() {
			this.history = new Yr(this.history.maxGeneration)
		},
		markClean: function() {
			this.cleanGeneration = this.changeGeneration(!0)
		},
		changeGeneration: function(e) {
			return e && (this.history.lastOp = this.history.lastOrigin = null), this.history.generation
		},
		isClean: function(e) {
			return this.history.generation == (e || this.cleanGeneration)
		},
		getHistory: function() {
			return {
				done: ni(this.history.done),
				undone: ni(this.history.undone)
			}
		},
		setHistory: function(e) {
			var n = this.history = new Yr(this.history.maxGeneration);
			n.done = ni(e.done.slice(0), null, !0), n.undone = ni(e.undone.slice(0), null, !0)
		},
		markText: function(e, n, t) {
			return Vt(this, ve(this, e), ve(this, n), t, "range")
		},
		setBookmark: function(e, n) {
			var t = {
				replacedWith: n && (null == n.nodeType ? n.widget : n),
				insertLeft: n && n.insertLeft,
				clearWhenEmpty: !1,
				shared: n && n.shared
			};
			return Vt(this, e = ve(this, e), e, t, "bookmark")
		},
		findMarksAt: function(e) {
			var n = [],
				t = Hr(this, (e = ve(this, e)).line).markedSpans;
			if (t)
				for (var r = 0; r < t.length; ++r) {
					var i = t[r];
					(null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && n.push(i.marker.parent || i.marker)
				}
			return n
		},
		findMarks: function(e, n) {
			e = ve(this, e), n = ve(this, n);
			var t = [],
				r = e.line;
			return this.iter(e.line, n.line + 1, (function(i) {
				var o = i.markedSpans;
				if (o)
					for (var a = 0; a < o.length; a++) {
						var l = o[a];
						r == e.line && e.ch > l.to || null == l.from && r != e.line || r == n.line && l.from > n.ch || t.push(l.marker.parent || l.marker)
					}++r
			})), t
		},
		getAllMarks: function() {
			var e = [];
			return this.iter((function(n) {
				var t = n.markedSpans;
				if (t)
					for (var r = 0; r < t.length; ++r) null != t[r].from && e.push(t[r].marker)
			})), e
		},
		posFromIndex: function(e) {
			var n, t = this.first;
			return this.iter((function(r) {
				var i = r.text.length + 1;
				if (i > e) return n = e, !0;
				e -= i, ++t
			})), ve(this, le(t, n))
		},
		indexFromPos: function(e) {
			var n = (e = ve(this, e)).ch;
			return e.line < this.first || e.ch < 0 ? 0 : (this.iter(this.first, e.line, (function(e) {
				n += e.text.length + 1
			})), n)
		},
		copy: function(e) {
			var n = new Nr(Wr(this, this.first, this.first + this.size), this.modeOption, this.first);
			return n.scrollTop = this.scrollTop, n.scrollLeft = this.scrollLeft, n.sel = this.sel, n.extend = !1, e && (n.history.undoDepth = this.history.undoDepth, n.setHistory(this.getHistory())), n
		},
		linkedDoc: function(e) {
			e || (e = {});
			var n = this.first,
				t = this.first + this.size;
			null != e.from && e.from > n && (n = e.from), null != e.to && e.to < t && (t = e.to);
			var r = new Nr(Wr(this, n, t), e.mode || this.modeOption, n);
			return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({
				doc: r,
				sharedHist: e.sharedHist
			}), r.linked = [{
				doc: this,
				isParent: !0,
				sharedHist: e.sharedHist
			}], r
		},
		unlinkDoc: function(e) {
			if (e instanceof S && (e = e.doc), this.linked)
				for (var n = 0; n < this.linked.length; ++n) {
					if (this.linked[n].doc == e) {
						this.linked.splice(n, 1), e.unlinkDoc(this);
						break
					}
				}
			if (e.history == this.history) {
				var t = [e.id];
				Fr(e, (function(e) {
					t.push(e.id)
				}), !0), e.history = new Yr(null), e.history.done = ni(this.history.done, t), e.history.undone = ni(this.history.undone, t)
			}
		},
		iterLinkedDocs: function(e) {
			Fr(this, e)
		},
		getMode: function() {
			return this.mode
		},
		getEditor: function() {
			return this.cm
		}
	}), Nr.prototype.eachLine = Nr.prototype.iter;
	var Br = "iter insert remove copy getEditor".split(" ");
	for (var Pr in Nr.prototype) Nr.prototype.hasOwnProperty(Pr) && Ai(Br, Pr) < 0 && (S.prototype[Pr] = function(e) {
		return function() {
			return e.apply(this.doc, arguments)
		}
	}(Nr.prototype[Pr]));

	function Fr(e, n, t) {
		! function e(r, i, o) {
			if (r.linked)
				for (var a = 0; a < r.linked.length; ++a) {
					var l = r.linked[a];
					if (l.doc != i) {
						var s = o && l.sharedHist;
						t && !s || (n(l.doc, s), e(l.doc, r, s))
					}
				}
		}(e, null, !0)
	}

	function jr(e, n) {
		if (n.cm) throw new Error("This document is already in use.");
		e.doc = n, n.cm = e, L(e), E(e), e.options.lineWrapping || B(e), e.options.mode = n.modeOption, wn(e)
	}

	function Hr(e, n) {
		if ((n -= e.first) < 0 || n >= e.size) throw new Error("There is no line " + (n + e.first) + " in the document.");
		for (var t = e; !t.lines;)
			for (var r = 0;; ++r) {
				var i = t.children[r],
					o = i.chunkSize();
				if (n < o) {
					t = i;
					break
				}
				n -= o
			}
		return t.lines[n]
	}

	function zr(e, n, t) {
		var r = [],
			i = n.line;
		return e.iter(n.line, t.line + 1, (function(e) {
			var o = e.text;
			i == t.line && (o = o.slice(0, t.ch)), i == n.line && (o = o.slice(n.ch)), r.push(o), ++i
		})), r
	}

	function Wr(e, n, t) {
		var r = [];
		return e.iter(n, t, (function(e) {
			r.push(e.text)
		})), r
	}

	function Ur(e, n) {
		var t = n - e.height;
		if (t)
			for (var r = e; r; r = r.parent) r.height += t
	}

	function Vr(e) {
		if (null == e.parent) return null;
		for (var n = e.parent, t = Ai(n.lines, e), r = n.parent; r; n = r, r = r.parent)
			for (var i = 0; r.children[i] != n; ++i) t += r.children[i].chunkSize();
		return t + n.first
	}

	function qr(e, n) {
		var t = e.first;
		e: do {
			for (var r = 0; r < e.children.length; ++r) {
				var i = e.children[r],
					o = i.height;
				if (n < o) {
					e = i;
					continue e
				}
				n -= o, t += i.chunkSize()
			}
			return t
		} while (!e.lines);
		for (r = 0; r < e.lines.length; ++r) {
			var a = e.lines[r].height;
			if (n < a) break;
			n -= a
		}
		return t + r
	}

	function Gr(e) {
		for (var n = 0, t = (e = lr(e)).parent, r = 0; r < t.lines.length; ++r) {
			var i = t.lines[r];
			if (i == e) break;
			n += i.height
		}
		for (var o = t.parent; o; o = (t = o).parent)
			for (r = 0; r < o.children.length; ++r) {
				var a = o.children[r];
				if (a == t) break;
				n += a.height
			}
		return n
	}

	function Xr(e) {
		var n = e.order;
		return null == n && (n = e.order = _o(e.text)), n
	}

	function Yr(e) {
		this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
	}

	function Jr(e, n) {
		var t = {
			from: ce(n.from),
			to: rt(n),
			text: zr(e, n.from, n.to)
		};
		return Zr(e, t, n.from.line, n.to.line + 1), Fr(e, (function(e) {
			Zr(e, t, n.from.line, n.to.line + 1)
		}), !0), t
	}

	function Kr(e) {
		for (; e.length;) {
			if (!Ii(e).ranges) break;
			e.pop()
		}
	}

	function $r(e, n, t, r) {
		var i = e.history;
		i.undone.length = 0;
		var o, a = +new Date;
		if ((i.lastOp == r || i.lastOrigin == n.origin && n.origin && ("+" == n.origin.charAt(0) && e.cm && i.lastModTime > a - e.cm.options.historyEventDelay || "*" == n.origin.charAt(0))) && (o = function(e, n) {
				return n ? (Kr(e.done), Ii(e.done)) : e.done.length && !Ii(e.done).ranges ? Ii(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), Ii(e.done)) : void 0
			}(i, i.lastOp == r))) {
			var l = Ii(o.changes);
			0 == se(n.from, n.to) && 0 == se(n.from, l.to) ? l.to = rt(n) : o.changes.push(Jr(e, n))
		} else {
			var s = Ii(i.done);
			for (s && s.ranges || Qr(e.sel, i.done), o = {
					changes: [Jr(e, n)],
					generation: i.generation
				}, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
		}
		i.done.push(t), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = a, i.lastOp = r, i.lastOrigin = i.lastSelOrigin = n.origin, l || pi(e, "historyAdded")
	}

	function Qr(e, n) {
		var t = Ii(n);
		t && t.ranges && t.equals(e) || n.push(e)
	}

	function Zr(e, n, t, r) {
		var i = n["spans_" + e.id],
			o = 0;
		e.iter(Math.max(e.first, t), Math.min(e.first + e.size, r), (function(t) {
			t.markedSpans && ((i || (i = n["spans_" + e.id] = {}))[o] = t.markedSpans), ++o
		}))
	}

	function ei(e) {
		if (!e) return null;
		for (var n, t = 0; t < e.length; ++t) e[t].marker.explicitlyCleared ? n || (n = e.slice(0, t)) : n && n.push(e[t]);
		return n ? n.length ? n : null : e
	}

	function ni(e, n, t) {
		for (var r = 0, i = []; r < e.length; ++r) {
			var o = e[r];
			if (o.ranges) i.push(t ? he.prototype.deepCopy.call(o) : o);
			else {
				var a = o.changes,
					l = [];
				i.push({
					changes: l
				});
				for (var s = 0; s < a.length; ++s) {
					var c, u = a[s];
					if (l.push({
							from: u.from,
							to: u.to,
							text: u.text
						}), n)
						for (var d in u)(c = d.match(/^spans_(\d+)$/)) && Ai(n, Number(c[1])) > -1 && (Ii(l)[d] = u[d], delete u[d])
				}
			}
		}
		return i
	}

	function ti(e, n, t, r) {
		t < e.line ? e.line += r : n < e.line && (e.line = n, e.ch = 0)
	}

	function ri(e, n, t, r) {
		for (var i = 0; i < e.length; ++i) {
			var o = e[i],
				a = !0;
			if (o.ranges) {
				o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
				for (var l = 0; l < o.ranges.length; l++) ti(o.ranges[l].anchor, n, t, r), ti(o.ranges[l].head, n, t, r)
			} else {
				for (l = 0; l < o.changes.length; ++l) {
					var s = o.changes[l];
					if (t < s.from.line) s.from = le(s.from.line + r, s.from.ch), s.to = le(s.to.line + r, s.to.ch);
					else if (n <= s.to.line) {
						a = !1;
						break
					}
				}
				a || (e.splice(0, i + 1), i = 0)
			}
		}
	}

	function ii(e, n) {
		var t = n.from.line,
			r = n.to.line,
			i = n.text.length - (r - t) - 1;
		ri(e.done, t, r, i), ri(e.undone, t, r, i)
	}
	wi(Nr);
	var oi = S.e_preventDefault = function(e) {
			e.preventDefault ? e.preventDefault() : e.returnValue = !1
		},
		ai = S.e_stopPropagation = function(e) {
			e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
		};

	function li(e) {
		return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
	}
	var si = S.e_stop = function(e) {
		oi(e), ai(e)
	};

	function ci(e) {
		return e.target || e.srcElement
	}

	function ui(e) {
		var n = e.which;
		return null == n && (1 & e.button ? n = 1 : 2 & e.button ? n = 3 : 4 & e.button && (n = 2)), y && e.ctrlKey && 1 == n && (n = 3), n
	}
	var di, hi = S.on = function(e, n, t) {
			if (e.addEventListener) e.addEventListener(n, t, !1);
			else if (e.attachEvent) e.attachEvent("on" + n, t);
			else {
				var r = e._handlers || (e._handlers = {});
				(r[n] || (r[n] = [])).push(t)
			}
		},
		fi = S.off = function(e, n, t) {
			if (e.removeEventListener) e.removeEventListener(n, t, !1);
			else if (e.detachEvent) e.detachEvent("on" + n, t);
			else {
				var r = e._handlers && e._handlers[n];
				if (!r) return;
				for (var i = 0; i < r.length; ++i)
					if (r[i] == t) {
						r.splice(i, 1);
						break
					}
			}
		},
		pi = S.signal = function(e, n) {
			var t = e._handlers && e._handlers[n];
			if (t)
				for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < t.length; ++i) t[i].apply(null, r)
		},
		gi = 0;

	function mi(e, n) {
		var t = e._handlers && e._handlers[n];
		if (t) {
			var r = Array.prototype.slice.call(arguments, 2);
			di || (++gi, di = [], setTimeout(vi, 0));
			for (var i = 0; i < t.length; ++i) di.push(o(t[i]))
		}

		function o(e) {
			return function() {
				e.apply(null, r)
			}
		}
	}

	function vi() {
		--gi;
		var e = di;
		di = null;
		for (var n = 0; n < e.length; ++n) e[n]()
	}

	function yi(e, n, t) {
		return pi(e, t || n.type, e, n), li(n) || n.codemirrorIgnore
	}

	function bi(e, n) {
		var t = e._handlers && e._handlers[n];
		return t && t.length > 0
	}

	function wi(e) {
		e.prototype.on = function(e, n) {
			hi(this, e, n)
		}, e.prototype.off = function(e, n) {
			fi(this, e, n)
		}
	}
	var _i = 30,
		Ci = S.Pass = {
			toString: function() {
				return "CodeMirror.Pass"
			}
		},
		ki = {
			scroll: !1
		},
		xi = {
			origin: "*mouse"
		},
		Si = {
			origin: "+move"
		};

	function Mi() {
		this.id = null
	}
	Mi.prototype.set = function(e, n) {
		clearTimeout(this.id), this.id = setTimeout(n, e)
	};
	var Ei = S.countColumn = function(e, n, t, r, i) {
		null == n && -1 == (n = e.search(/[^\s\u00a0]/)) && (n = e.length);
		for (var o = r || 0, a = i || 0;;) {
			var l = e.indexOf("\t", o);
			if (l < 0 || l >= n) return a + (n - o);
			a += l - o, a += t - a % t, o = l + 1
		}
	};

	function Ri(e, n, t) {
		for (var r = 0, i = 0;;) {
			var o = e.indexOf("\t", r); - 1 == o && (o = e.length);
			var a = o - r;
			if (o == e.length || i + a >= n) return r + Math.min(a, n - i);
			if (i += o - r, r = o + 1, (i += t - i % t) >= n) return r
		}
	}
	var Ti = [""];

	function Li(e) {
		for (; Ti.length <= e;) Ti.push(Ii(Ti) + " ");
		return Ti[e]
	}

	function Ii(e) {
		return e[e.length - 1]
	}
	var Oi = function(e) {
		e.select()
	};

	function Ai(e, n) {
		for (var t = 0; t < e.length; ++t)
			if (e[t] == n) return t;
		return -1
	}

	function Di(e, n) {
		for (var t = [], r = 0; r < e.length; r++) t[r] = n(e[r], r);
		return t
	}

	function Ni(e, n) {
		var t;
		if (Object.create) t = Object.create(e);
		else {
			var r = function() {};
			r.prototype = e, t = new r
		}
		return n && Bi(n, t), t
	}

	function Bi(e, n) {
		for (var t in n || (n = {}), e) e.hasOwnProperty(t) && (n[t] = e[t]);
		return n
	}

	function Pi(e) {
		var n = Array.prototype.slice.call(arguments, 1);
		return function() {
			return e.apply(null, n)
		}
	}
	m ? Oi = function(e) {
		e.selectionStart = 0, e.selectionEnd = e.value.length
	} : a && (Oi = function(e) {
		try {
			e.select()
		} catch (e) {}
	}), [].indexOf && (Ai = function(e, n) {
		return e.indexOf(n)
	}), [].map && (Di = function(e, n) {
		return e.map(n)
	});
	var Fi = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
		ji = S.isWordChar = function(e) {
			return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Fi.test(e))
		};

	function Hi(e) {
		for (var n in e)
			if (e.hasOwnProperty(n) && e[n]) return !1;
		return !0
	}
	var zi = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;

	function Wi(e) {
		return e.charCodeAt(0) >= 768 && zi.test(e)
	}
	var Ui, Vi = {};

	function qi(e) {
		function n(e) {
			return (e = e.trim()).length < 4 ? null : e.length < 7 ? [17 * parseInt(e.charAt(1), 16), 17 * parseInt(e.charAt(2), 16), 17 * parseInt(e.charAt(3), 16)] : [parseInt(e.substr(1, 2), 16), parseInt(e.substr(3, 2), 16), parseInt(e.substr(5, 2), 16)]
		}

		function t(e) {
			var n = [e[0], e[1], e[2]].map((function(e) {
				return (e /= 255) <= .03928 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
			}));
			return .2126 * n[0] + .7152 * n[1] + .0722 * n[2]
		}
		var r = t(n("#0F192A"));

		function i(e) {
			return (t(e) + .05) / (r + .05)
		}

		function o(e) {
			var n, t, r, i = e[0],
				o = e[1],
				a = e[2];
			if (0 == o) n = t = r = a;
			else {
				function c(e, n, t) {
					return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? e + 6 * (n - e) * t : t < .5 ? n : t < 2 / 3 ? e + (n - e) * (2 / 3 - t) * 6 : e
				}
				var l = a < .5 ? a * (1 + o) : a + o - a * o,
					s = 2 * a - l;
				n = c(s, l, i + 1 / 3), t = c(s, l, i), r = c(s, l, i - 1 / 3)
			}
			return [255 * n, 255 * t, 255 * r]
		}
		var a, l = e;
		if (Vi[l]) a = Vi[l];
		else {
			var s = n(l);
			if (s) {
				var c = i(s);
				if (c < 2.361) {
					var u = function(e) {
						var n = e[0],
							t = e[1],
							r = e[2];
						n /= 255, t /= 255, r /= 255;
						var i, o, a = Math.max(n, t, r),
							l = Math.min(n, t, r),
							s = (a + l) / 2;
						if (a == l) i = o = 0;
						else {
							var c = a - l;
							switch (o = s > .5 ? c / (2 - a - l) : c / (a + l), a) {
								case n:
									i = (t - r) / c + (t < r ? 6 : 0);
									break;
								case t:
									i = (r - n) / c + 2;
									break;
								case r:
									i = (n - t) / c + 4
							}
							i /= 6
						}
						return [i, o, s]
					}(s);
					do {
						u[2] += .01, c = i(o(u))
					} while (c < 2.361);
					a = "color: hsl(" + ~~(360 * u[0]) + "," + ~~(100 * u[1]) + "%," + ~~(100 * u[2]) + "%)"
				} else a = "color:" + l
			}
			Vi[l] = a
		}
		return a
	}

	function Gi(e, n, t, r) {
		var i = document.createElement(e);
		if (t) {
			if (0 === t.indexOf("cm-MULTICOLOR")) r = qi(t.substr(13)), t = "cm-COLOR";
			else if (-1 !== t.indexOf("cm-COLOR-#")) {
				r = qi(t.match(/cm-COLOR-(#[0-9a-fA-F]+)/)[1])
			}
			i.className = t
		}
		if (r && (i.style.cssText = r), "string" == typeof n) i.appendChild(document.createTextNode(n));
		else if (n)
			for (var o = 0; o < n.length; ++o) i.appendChild(n[o]);
		return i
	}

	function Xi(e) {
		for (var n = e.childNodes.length; n > 0; --n) e.removeChild(e.firstChild);
		return e
	}

	function Yi(e, n) {
		return Xi(e).appendChild(n)
	}

	function Ji(e, n) {
		if (e.contains) return e.contains(n);
		for (; n = n.parentNode;)
			if (n == e) return !0
	}

	function Ki() {
		return document.activeElement
	}
	Ui = document.createRange ? function(e, n, t) {
		var r = document.createRange();
		return r.setEnd(e, t), r.setStart(e, n), r
	} : function(e, n, t) {
		var r = document.body.createTextRange();
		return r.moveToElementText(e.parentNode), r.collapse(!0), r.moveEnd("character", t), r.moveStart("character", n), r
	}, n && (Ki = function() {
		try {
			return document.activeElement
		} catch (e) {
			return document.body
		}
	});
	var $i, Qi, Zi, eo = function() {
		if (r) return !1;
		var e = Gi("div");
		return "draggable" in e || "dragDrop" in e
	}();

	function no(e) {
		if (null != $i) return $i;
		var n = Gi("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
		return Yi(e, n), n.offsetWidth && ($i = n.offsetHeight - n.clientHeight), $i || 0
	}

	function to(e) {
		if (null == Qi) {
			var n = Gi("span", "​");
			Yi(e, Gi("span", [n, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Qi = n.offsetWidth <= 1 && n.offsetHeight > 2 && !t)
		}
		return Qi ? Gi("span", "​") : Gi("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px")
	}

	function ro(e) {
		if (null != Zi) return Zi;
		var n = Yi(e, document.createTextNode("AخA")),
			t = Ui(n, 0, 1).getBoundingClientRect();
		if (t.left == t.right) return !1;
		var r = Ui(n, 1, 2).getBoundingClientRect();
		return Zi = r.right - t.right < 3
	}
	var io, oo, ao = S.splitLines = 3 != "\n\nb".split(/\n/).length ? function(e) {
			for (var n = 0, t = [], r = e.length; n <= r;) {
				var i = e.indexOf("\n", n); - 1 == i && (i = e.length);
				var o = e.slice(n, "\r" == e.charAt(i - 1) ? i - 1 : i),
					a = o.indexOf("\r"); - 1 != a ? (t.push(o.slice(0, a)), n += a + 1) : (t.push(o), n = i + 1)
			}
			return t
		} : function(e) {
			return e.split(/\r\n?|\n/)
		},
		lo = window.getSelection ? function(e) {
			try {
				return e.selectionStart != e.selectionEnd
			} catch (e) {
				return !1
			}
		} : function(e) {
			try {
				var n = e.ownerDocument.selection.createRange()
			} catch (e) {}
			return !(!n || n.parentElement() != e) && 0 != n.compareEndPoints("StartToEnd", n)
		},
		so = "oncopy" in (io = Gi("div")) || (io.setAttribute("oncopy", "return;"), "function" == typeof io.oncopy),
		co = {
			3: "Enter",
			8: "Backspace",
			9: "Tab",
			13: "Enter",
			16: "Shift",
			17: "Ctrl",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Esc",
			32: "Space",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "Left",
			38: "Up",
			39: "Right",
			40: "Down",
			44: "PrintScrn",
			45: "Insert",
			46: "Delete",
			59: ";",
			61: "=",
			91: "Mod",
			92: "Mod",
			93: "Mod",
			107: "=",
			109: "-",
			127: "Delete",
			173: "-",
			186: ";",
			187: "=",
			188: ",",
			189: "-",
			190: ".",
			191: "/",
			192: "`",
			219: "[",
			220: "\\",
			221: "]",
			222: "'",
			63232: "Up",
			63233: "Down",
			63234: "Left",
			63235: "Right",
			63272: "Delete",
			63273: "Home",
			63275: "End",
			63276: "PageUp",
			63277: "PageDown",
			63302: "Insert"
		};

	function uo(e) {
		return e.level % 2 ? e.to : e.from
	}

	function ho(e) {
		return e.level % 2 ? e.from : e.to
	}

	function fo(e) {
		var n = Xr(e);
		return n ? uo(n[0]) : 0
	}

	function po(e) {
		var n = Xr(e);
		return n ? ho(Ii(n)) : e.text.length
	}

	function go(e, n) {
		var t = Hr(e.doc, n),
			r = lr(t);
		r != t && (n = Vr(r));
		var i = Xr(r),
			o = i ? i[0].level % 2 ? po(r) : fo(r) : 0;
		return le(n, o)
	}

	function mo(e, n, t) {
		var r = e[0].level;
		return n == r || t != r && n < t
	}

	function vo(e, n) {
		oo = null;
		for (var t, r = 0; r < e.length; ++r) {
			var i = e[r];
			if (i.from < n && i.to > n) return r;
			if (i.from == n || i.to == n) {
				if (null != t) return mo(e, i.level, e[t].level) ? (i.from != i.to && (oo = t), r) : (i.from != i.to && (oo = r), t);
				t = r
			}
		}
		return t
	}

	function yo(e, n, t, r) {
		if (!r) return n + t;
		do {
			n += t
		} while (n > 0 && Wi(e.text.charAt(n)));
		return n
	}

	function bo(e, n, t, r) {
		var i = Xr(e);
		if (!i) return wo(e, n, t, r);
		for (var o = vo(i, n), a = i[o], l = yo(e, n, a.level % 2 ? -t : t, r);;) {
			if (l > a.from && l < a.to) return l;
			if (l == a.from || l == a.to) return vo(i, l) == o ? l : t > 0 == (a = i[o += t]).level % 2 ? a.to : a.from;
			if (!(a = i[o += t])) return null;
			l = t > 0 == a.level % 2 ? yo(e, a.to, -1, r) : yo(e, a.from, 1, r)
		}
	}

	function wo(e, n, t, r) {
		var i = n + t;
		if (r)
			for (; i > 0 && Wi(e.text.charAt(i));) i += t;
		return i < 0 || i > e.text.length ? null : i
	}
	S.keyNames = co,
		function() {
			for (var e = 0; e < 10; e++) co[e + 48] = co[e + 96] = String(e);
			for (e = 65; e <= 90; e++) co[e] = String.fromCharCode(e);
			for (e = 1; e <= 12; e++) co[e + 111] = co[e + 63235] = "F" + e
		}();
	var _o = function() {
		function e(e) {
			return e <= 247 ? "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(e) : 1424 <= e && e <= 1524 ? "R" : 1536 <= e && e <= 1773 ? "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm".charAt(e - 1536) : 1774 <= e && e <= 2220 ? "r" : 8192 <= e && e <= 8203 ? "w" : 8204 == e ? "b" : "L"
		}
		var n = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
			t = /[stwN]/,
			r = /[LRr]/,
			i = /[Lb1n]/,
			o = /[1n]/,
			a = "L";

		function l(e, n, t) {
			this.level = e, this.from = n, this.to = t
		}
		return function(s) {
			if (!n.test(s)) return !1;
			for (var c = s.length, u = [], d = 0; d < c; ++d) u.push(v = e(s.charCodeAt(d)));
			d = 0;
			for (var h = a; d < c; ++d) {
				"m" == (v = u[d]) ? u[d] = h: h = v
			}
			d = 0;
			for (var f = a; d < c; ++d) {
				"1" == (v = u[d]) && "r" == f ? u[d] = "n" : r.test(v) && (f = v, "r" == v && (u[d] = "R"))
			}
			for (d = 1, h = u[0]; d < c - 1; ++d) {
				"+" == (v = u[d]) && "1" == h && "1" == u[d + 1] ? u[d] = "1" : "," != v || h != u[d + 1] || "1" != h && "n" != h || (u[d] = h), h = v
			}
			for (d = 0; d < c; ++d) {
				if ("," == (v = u[d])) u[d] = "N";
				else if ("%" == v) {
					for (var p = d + 1; p < c && "%" == u[p]; ++p);
					for (var g = d && "!" == u[d - 1] || p < c && "1" == u[p] ? "1" : "N", m = d; m < p; ++m) u[m] = g;
					d = p - 1
				}
			}
			for (d = 0, f = a; d < c; ++d) {
				var v = u[d];
				"L" == f && "1" == v ? u[d] = "L" : r.test(v) && (f = v)
			}
			for (d = 0; d < c; ++d)
				if (t.test(u[d])) {
					for (p = d + 1; p < c && t.test(u[p]); ++p);
					var y = "L" == (d ? u[d - 1] : a),
						b = "L" == (p < c ? u[p] : a);
					for (g = y || b ? "L" : "R", m = d; m < p; ++m) u[m] = g;
					d = p - 1
				} var w, _ = [];
			for (d = 0; d < c;)
				if (i.test(u[d])) {
					var C = d;
					for (++d; d < c && i.test(u[d]); ++d);
					_.push(new l(0, C, d))
				} else {
					var k = d,
						x = _.length;
					for (++d; d < c && "L" != u[d]; ++d);
					for (m = k; m < d;)
						if (o.test(u[m])) {
							k < m && _.splice(x, 0, new l(1, k, m));
							var S = m;
							for (++m; m < d && o.test(u[m]); ++m);
							_.splice(x, 0, new l(2, S, m)), k = m
						} else ++m;
					k < d && _.splice(x, 0, new l(1, k, d))
				} return 1 == _[0].level && (w = s.match(/^\s+/)) && (_[0].from = w[0].length, _.unshift(new l(0, 0, w[0].length))), 1 == Ii(_).level && (w = s.match(/\s+$/)) && (Ii(_).to -= w[0].length, _.push(new l(0, c - w[0].length, c))), _[0].level != Ii(_).level && _.push(new l(_[0].level, c, c)), _
		}
	}();
	return S.version = "4.0.3", S
})),
function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
	"use strict";
	var n = "CodeMirror-activeline",
		t = "CodeMirror-activeline-background";

	function r(e) {
		for (var r = 0; r < e.state.activeLines.length; r++) e.removeLineClass(e.state.activeLines[r], "wrap", n), e.removeLineClass(e.state.activeLines[r], "background", t)
	}

	function i(e, i) {
		for (var o = [], a = 0; a < i.length; a++) {
			var l = e.getLineHandleVisualStart(i[a].head.line);
			o[o.length - 1] != l && o.push(l)
		}(function(e, n) {
			if (e.length != n.length) return !1;
			for (var t = 0; t < e.length; t++)
				if (e[t] != n[t]) return !1;
			return !0
		})(e.state.activeLines, o) || e.operation((function() {
			r(e);
			for (var i = 0; i < o.length; i++) e.addLineClass(o[i], "wrap", n), e.addLineClass(o[i], "background", t);
			e.state.activeLines = o
		}))
	}

	function o(e, n) {
		i(e, n.ranges)
	}
	e.defineOption("styleActiveLine", !1, (function(n, t, a) {
		var l = a && a != e.Init;
		t && !l ? (n.state.activeLines = [], i(n, n.listSelections()), n.on("beforeSelectionChange", o)) : !t && l && (n.off("beforeSelectionChange", o), r(n), delete n.state.activeLines)
	}))
})),
function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
	function n(e, n, t) {
		var r;
		return (r = e.getWrapperElement().appendChild(document.createElement("div"))).className = t ? "CodeMirror-dialog CodeMirror-dialog-bottom" : "CodeMirror-dialog CodeMirror-dialog-top", "string" == typeof n ? r.innerHTML = n : r.appendChild(n), r
	}

	function t(e, n) {
		e.state.currentNotificationClose && e.state.currentNotificationClose(), e.state.currentNotificationClose = n
	}
	e.defineExtension("openDialog", (function(r, i, o) {
		t(this, null);
		var a = n(this, r, o && o.bottom),
			l = !1,
			s = this;

		function c() {
			l || (l = !0, a.parentNode.removeChild(a))
		}
		var u, d = a.getElementsByTagName("input")[0];
		return d ? (o && o.value && (d.value = o.value), e.on(d, "keydown", (function(n) {
			o && o.onKeyDown && o.onKeyDown(n, d.value, c) || 13 != n.keyCode && 27 != n.keyCode || (d.blur(), e.e_stop(n), c(), s.focus(), 13 == n.keyCode && i(d.value))
		})), o && o.onKeyUp && e.on(d, "keyup", (function(e) {
			o.onKeyUp(e, d.value, c)
		})), o && o.value && (d.value = o.value), d.focus(), e.on(d, "blur", c)) : (u = a.getElementsByTagName("button")[0]) && (e.on(u, "click", (function() {
			c(), s.focus()
		})), u.focus(), e.on(u, "blur", c)), c
	})), e.defineExtension("openConfirm", (function(r, i, o) {
		t(this, null);
		var a = n(this, r, o && o.bottom),
			l = a.getElementsByTagName("button"),
			s = !1,
			c = this,
			u = 1;

		function d() {
			s || (s = !0, a.parentNode.removeChild(a), c.focus())
		}
		l[0].focus();
		for (var h = 0; h < l.length; ++h) {
			var f = l[h];
			! function(n) {
				e.on(f, "click", (function(t) {
					e.e_preventDefault(t), d(), n && n(c)
				}))
			}(i[h]), e.on(f, "blur", (function() {
				--u, setTimeout((function() {
					u <= 0 && d()
				}), 200)
			})), e.on(f, "focus", (function() {
				++u
			}))
		}
	})), e.defineExtension("openNotification", (function(r, i) {
		t(this, c);
		var o, a = n(this, r, i && i.bottom),
			l = i && (void 0 === i.duration ? 5e3 : i.duration),
			s = !1;

		function c() {
			s || (s = !0, clearTimeout(o), a.parentNode.removeChild(a))
		}
		e.on(a, "click", (function(n) {
			e.e_preventDefault(n), c()
		})), l && (o = setTimeout(c, i.duration))
	}))
})),
function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("./searchcursor"), require("../dialog/dialog")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "./searchcursor", "../dialog/dialog"], e) : e(CodeMirror)
}((function(e) {
	"use strict";

	function n() {
		this.posFrom = this.posTo = this.query = null, this.overlay = null
	}

	function t(e) {
		return e.state.search || (e.state.search = new n)
	}

	function r(e) {
		return "string" == typeof e && e == e.toLowerCase()
	}

	function i(e, n, t) {
		return e.getSearchCursor(n, t, r(n))
	}

	function o(e, n, t, r, i) {
		e.openDialog ? e.openDialog(n, i, {
			value: r
		}) : i(prompt(t, r))
	}

	function a(e) {
		var n = e.match(/^\/(.*)\/([a-z]*)$/);
		return n ? (e = new RegExp(n[1], -1 == n[2].indexOf("i") ? "" : "i")).test("") && (e = /x^/) : "" == e && (e = /x^/), e
	}

	function l(e, n) {
		var i = t(e);
		if (i.query) return s(e, n);
		o(e, 'Search: <input type="text" style="width: 10em"/>', "Search for:", e.getSelection(), (function(t) {
			e.operation((function() {
				t && !i.query && (i.query = a(t), e.removeOverlay(i.overlay, r(i.query)), i.overlay = function(e, n) {
					var t;
					return "string" == typeof e ? (t = e.charAt(0), e = new RegExp("^" + e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), n ? "i" : "")) : e = new RegExp("^(?:" + e.source + ")", e.ignoreCase ? "i" : ""), {
						token: function(r) {
							if (r.match(e)) return "searching";
							for (; !r.eol() && (r.next(), t && !n && (r.skipTo(t) || r.skipToEnd()), !r.match(e, !1)););
						}
					}
				}(i.query, r(i.query)), e.addOverlay(i.overlay), i.posFrom = i.posTo = e.getCursor(), s(e, n))
			}))
		}))
	}

	function s(n, r) {
		n.operation((function() {
			var o = t(n),
				a = i(n, o.query, r ? o.posFrom : o.posTo);
			(a.find(r) || (a = i(n, o.query, r ? e.Pos(n.lastLine()) : e.Pos(n.firstLine(), 0))).find(r)) && (n.setSelection(a.from(), a.to()), n.scrollIntoView({
				from: a.from(),
				to: a.to()
			}), o.posFrom = a.from(), o.posTo = a.to())
		}))
	}

	function c(e) {
		e.operation((function() {
			var n = t(e);
			n.query && (n.query = null, e.removeOverlay(n.overlay))
		}))
	}

	function u(e, n) {
		o(e, 'Replace: <input type="text" style="width: 10em"/> ', "Replace:", e.getSelection(), (function(t) {
			t && (t = a(t), o(e, 'With: <input type="text" style="width: 10em"/>', "Replace with:", "", (function(r) {
				if (n) e.operation((function() {
					for (var n = i(e, t); n.findNext();)
						if ("string" != typeof t) {
							var o = e.getRange(n.from(), n.to()).match(t);
							n.replace(r.replace(/\$(\d)/g, (function(e, n) {
								return o[n]
							})))
						} else n.replace(r)
				}));
				else {
					c(e);
					var o = i(e, t, e.getCursor()),
						a = function() {
							var n, r = o.from();
							!(n = o.findNext()) && (o = i(e, t), !(n = o.findNext()) || r && o.from().line == r.line && o.from().ch == r.ch) || (e.setSelection(o.from(), o.to()), e.scrollIntoView({
								from: o.from(),
								to: o.to()
							}), function(e, n, t, r) {
								e.openConfirm ? e.openConfirm(n, r) : confirm(t) && r[0]()
							}(e, "Replace? <button>Yes</button> <button>No</button> <button>Stop</button>", "Replace?", [function() {
								l(n)
							}, a]))
						},
						l = function(e) {
							o.replace("string" == typeof t ? r : r.replace(/\$(\d)/g, (function(n, t) {
								return e[t]
							}))), a()
						};
					a()
				}
			})))
		}))
	}
	e.commands.find = function(e) {
		c(e), l(e)
	}, e.commands.findNext = l, e.commands.findPrev = function(e) {
		l(e, !0)
	}, e.commands.clearSearch = c, e.commands.replace = u, e.commands.replaceAll = function(e) {
		u(e, !0)
	}
})),
function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
	"use strict";
	var n = e.Pos;

	function t(e, t, i, o) {
		if (o = !0, this.atOccurrence = !1, this.doc = e, null == o && "string" == typeof t && (o = !1), i = i ? e.clipPos(i) : n(0, 0), this.pos = {
				from: i,
				to: i
			}, "string" != typeof t) t.global || (t = new RegExp(t.source, t.ignoreCase ? "ig" : "g")), this.matches = function(r, i) {
			if (r) {
				t.lastIndex = 0;
				for (var o = e.getLine(i.line).slice(0, i.ch), a = 0;;) {
					t.lastIndex = a;
					var l = t.exec(o);
					if (!l) break;
					if (c = (s = l).index, (a = s.index + (s[0].length || 1)) == o.length) break
				}(u = s && s[0].length || 0) || (0 == c && 0 == o.length ? s = void 0 : c != e.getLine(i.line).length && u++)
			} else {
				t.lastIndex = i.ch;
				o = e.getLine(i.line);
				var s, c, u = (s = t.exec(o)) && s[0].length || 0;
				(c = s && s.index) + u == o.length || u || (u = 1)
			}
			if (s && u) return {
				from: n(i.line, c),
				to: n(i.line, c + u),
				match: s
			}
		};
		else {
			var a = t;
			o && (t = t.toLowerCase());
			var l = o ? function(e) {
					return e.toLowerCase()
				} : function(e) {
					return e
				},
				s = t.split("\n");
			if (1 == s.length) t.length ? this.matches = function(i, o) {
				if (i) {
					var s = e.getLine(o.line).slice(0, o.ch);
					if ((u = (c = l(s)).lastIndexOf(t)) > -1) return u = r(s, c, u), {
						from: n(o.line, u),
						to: n(o.line, u + a.length)
					}
				} else {
					var c, u;
					s = e.getLine(o.line).slice(o.ch);
					if ((u = (c = l(s)).indexOf(t)) > -1) return u = r(s, c, u) + o.ch, {
						from: n(o.line, u),
						to: n(o.line, u + a.length)
					}
				}
			} : this.matches = function() {};
			else {
				var c = a.split("\n");
				this.matches = function(t, r) {
					var i = s.length - 1;
					if (t) {
						if (r.line - (s.length - 1) < e.firstLine()) return;
						if (l(e.getLine(r.line).slice(0, c[i].length)) != s[s.length - 1]) return;
						for (var o = n(r.line, c[i].length), a = r.line - 1, u = i - 1; u >= 1; --u, --a)
							if (s[u] != l(e.getLine(a))) return;
						var d = (h = e.getLine(a)).length - c[0].length;
						if (l(h.slice(d)) != s[0]) return;
						return {
							from: n(a, d),
							to: o
						}
					}
					if (!(r.line + (s.length - 1) > e.lastLine())) {
						var h;
						d = (h = e.getLine(r.line)).length - c[0].length;
						if (l(h.slice(d)) == s[0]) {
							var f = n(r.line, d);
							for (a = r.line + 1, u = 1; u < i; ++u, ++a)
								if (s[u] != l(e.getLine(a))) return;
							if (e.getLine(a).slice(0, c[i].length) == s[i]) return {
								from: f,
								to: n(a, c[i].length)
							}
						}
					}
				}
			}
		}
	}

	function r(e, n, t) {
		if (e.length == n.length) return t;
		for (var r = Math.min(t, e.length);;) {
			var i = e.slice(0, r).toLowerCase().length;
			if (i < t) ++r;
			else {
				if (!(i > t)) return r;
				--r
			}
		}
	}
	t.prototype = {
		findNext: function() {
			return this.find(!1)
		},
		findPrevious: function() {
			return this.find(!0)
		},
		find: function(e) {
			var t = this,
				r = this.doc.clipPos(e ? this.pos.from : this.pos.to);

			function i(e) {
				var r = n(e, 0);
				return t.pos = {
					from: r,
					to: r
				}, t.atOccurrence = !1, !1
			}
			for (;;) {
				if (this.pos = this.matches(e, r)) return this.atOccurrence = !0, this.pos.match || !0;
				if (e) {
					if (!r.line) return i(0);
					r = n(r.line - 1, this.doc.getLine(r.line - 1).length)
				} else {
					var o = this.doc.lineCount();
					if (r.line == o - 1) return i(o);
					r = n(r.line + 1, 0)
				}
			}
		},
		from: function() {
			if (this.atOccurrence) return this.pos.from
		},
		to: function() {
			if (this.atOccurrence) return this.pos.to
		},
		replace: function(t) {
			if (this.atOccurrence) {
				var r = e.splitLines(t);
				this.doc.replaceRange(r, this.pos.from, this.pos.to), this.pos.to = n(this.pos.from.line + r.length - 1, r[r.length - 1].length + (1 == r.length ? this.pos.from.ch : 0))
			}
		}
	}, e.defineExtension("getSearchCursor", (function(e, n, r) {
		return !0, new t(this.doc, e, n, true)
	})), e.defineDocExtension("getSearchCursor", (function(e, n, r) {
		return !0, new t(this, e, n, true)
	})), e.defineExtension("selectMatches", (function(n, t) {
		for (var r = [], i = this.getSearchCursor(n, this.getCursor("from"), true); i.findNext() && !(e.cmpPos(i.to(), this.getCursor("to")) > 0);) r.push({
			anchor: i.from(),
			head: i.to()
		});
		r.length && this.setSelections(r, 0)
	}))
})),
function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
	"use strict";

	function n(e) {
		"object" == typeof e && (this.minChars = e.minChars, this.style = e.style, this.showToken = e.showToken, this.delay = e.delay), null == this.style && (this.style = "matchhighlight"), null == this.minChars && (this.minChars = 2), null == this.delay && (this.delay = 100), this.overlay = this.timeout = null
	}

	function t(e) {
		var n = e.state.matchHighlighter;
		clearTimeout(n.timeout), n.timeout = setTimeout((function() {
			r(e)
		}), n.delay)
	}

	function r(e) {
		e.operation((function() {
			var n = e.state.matchHighlighter;
			if (n.overlay && (e.removeOverlay(n.overlay), n.overlay = null), e.somethingSelected() || !n.showToken) {
				if (e.getCursor("head").line == e.getCursor("anchor").line) {
					var t = e.getSelections()[0].replace(/^\s+|\s+$/g, "");
					t.length >= n.minChars && e.addOverlay(n.overlay = i(t, !1, n.style))
				}
			} else {
				for (var r = !0 === n.showToken ? /[\w$]/ : n.showToken, o = e.getCursor(), a = e.getLine(o.line), l = o.ch, s = l; l && r.test(a.charAt(l - 1));) --l;
				for (; s < a.length && r.test(a.charAt(s));) ++s;
				l < s && e.addOverlay(n.overlay = i(a.slice(l, s), r, n.style))
			}
		}))
	}

	function i(e, n, t) {
		return {
			token: function(r) {
				if (r.match(e) && (!n || function(e, n) {
						return !(e.start && n.test(e.string.charAt(e.start - 1)) || e.pos != e.string.length && n.test(e.string.charAt(e.pos)))
					}(r, n))) return t;
				r.next(), r.skipTo(e.charAt(0)) || r.skipToEnd()
			}
		}
	}
	e.defineOption("highlightSelectionMatches", !1, (function(i, o, a) {
		if (a && a != e.Init) {
			var l = i.state.matchHighlighter.overlay;
			l && i.removeOverlay(l), clearTimeout(i.state.matchHighlighter.timeout), i.state.matchHighlighter = null, i.off("cursorActivity", t)
		}
		o && (i.state.matchHighlighter = new n(o), r(i), i.on("cursorActivity", t))
	}))
})),
function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
	"use strict";
	var n = "CodeMirror-hint-active";

	function t(e, n) {
		this.cm = e, this.options = n, this.widget = null, this.debounce = 0, this.tick = 0, this.startPos = this.cm.getCursor("start"), this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;
		var t = this;
		e.on("cursorActivity", this.activityFunc = function() {
			t.cursorActivity()
		})
	}
	e.showHint = function(e, n, t) {
		if (!n) return e.showHint(t);
		t && t.async && (n.async = !0);
		var r = {
			hint: n
		};
		if (t)
			for (var i in t) r[i] = t[i];
		return e.showHint(r)
	}, e.defineExtension("showHint", (function(n) {
		n = function(e, n, t) {
			var r = e.options.hintOptions,
				i = {};
			for (var o in c) i[o] = c[o];
			if (r)
				for (var o in r) void 0 !== r[o] && (i[o] = r[o]);
			if (t)
				for (var o in t) void 0 !== t[o] && (i[o] = t[o]);
			i.hint.resolve && (i.hint = i.hint.resolve(e, n));
			return i
		}(this, this.getCursor("start"), n);
		var r = this.listSelections();
		if (!(r.length > 1)) {
			if (this.somethingSelected()) {
				if (!n.hint.supportsSelection) return;
				for (var i = 0; i < r.length; i++)
					if (r[i].head.line != r[i].anchor.line) return
			}
			this.state.completionActive && this.state.completionActive.close();
			var o = this.state.completionActive = new t(this, n);
			o.options.hint && (e.signal(this, "startCompletion", this), o.update(!0))
		}
	}));
	var r = window.requestAnimationFrame || function(e) {
			return setTimeout(e, 1e3 / 60)
		},
		i = window.cancelAnimationFrame || clearTimeout;

	function o(e) {
		return "string" == typeof e ? e : e.text
	}

	function a(e, n) {
		for (; n && n != e;) {
			if ("LI" === n.nodeName.toUpperCase() && n.parentNode == e) return n;
			n = n.parentNode
		}
	}

	function l(t, r) {
		this.completion = t, this.data = r, this.picked = !1;
		var i = this,
			l = t.cm,
			s = this.hints = document.createElement("ul");
		s.className = "CodeMirror-hints", this.selectedHint = r.selectedHint || 0;
		for (var c = r.list, u = 0; u < c.length; ++u) {
			var d = s.appendChild(document.createElement("li")),
				h = c[u],
				f = "CodeMirror-hint" + (u != this.selectedHint ? "" : " " + n);
			null != h.className && (f = h.className + " " + f), d.className = f, h.render ? h.render(d, r, h) : d.appendChild(document.createTextNode(h.displayText || o(h))), d.hintId = u
		}
		var p = l.cursorCoords(t.options.alignWithWord ? r.from : null),
			g = p.left,
			m = p.bottom,
			v = !0;
		s.style.left = g + "px", s.style.top = m + "px";
		var y = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
			b = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
		(t.options.container || document.body).appendChild(s);
		var w = s.getBoundingClientRect(),
			_ = w.bottom - b,
			C = s.scrollHeight > s.clientHeight + 1,
			k = l.getScrollInfo();
		if (_ > 0) {
			var x = w.bottom - w.top;
			if (p.top - (p.bottom - w.top) - x > 0) s.style.top = (m = p.top - x) + "px", v = !1;
			else if (x > b) {
				s.style.height = b - 5 + "px", s.style.top = (m = p.bottom - w.top) + "px";
				var S = l.getCursor();
				r.from.ch != S.ch && (p = l.cursorCoords(S), s.style.left = (g = p.left) + "px", w = s.getBoundingClientRect())
			}
		}
		var M, E = w.right - y;
		if (E > 0 && (w.right - w.left > y && (s.style.width = y - 5 + "px", E -= w.right - w.left - y), s.style.left = (g = p.left - E) + "px"), C)
			for (var R = s.firstChild; R; R = R.nextSibling) R.style.paddingRight = l.display.nativeBarWidth + "px";
		(l.addKeyMap(this.keyMap = function(e, n) {
			var t = {
					Up: function() {
						n.moveFocus(-1)
					},
					Down: function() {
						n.moveFocus(1)
					},
					PageUp: function() {
						n.moveFocus(1 - n.menuSize(), !0)
					},
					PageDown: function() {
						n.moveFocus(n.menuSize() - 1, !0)
					},
					Enter: n.pick,
					Tab: n.pick,
					Esc: n.close
				},
				r = e.options.customKeys,
				i = r ? {} : t;

			function o(e, r) {
				var o;
				o = "string" != typeof r ? function(e) {
					return r(e, n)
				} : t.hasOwnProperty(r) ? t[r] : r, i[e] = o
			}
			if (r)
				for (var a in r) r.hasOwnProperty(a) && o(a, r[a]);
			var l = e.options.extraKeys;
			if (l)
				for (var a in l) l.hasOwnProperty(a) && o(a, l[a]);
			return i
		}(t, {
			moveFocus: function(e, n) {
				i.changeActive(i.selectedHint + e, n)
			},
			setFocus: function(e) {
				i.changeActive(e)
			},
			menuSize: function() {
				return i.screenAmount()
			},
			length: c.length,
			close: function() {
				t.close()
			},
			pick: function() {
				i.pick()
			},
			data: r
		})), t.options.closeOnUnfocus) && (l.on("blur", this.onBlur = function() {
			M = setTimeout((function() {
				t.close()
			}), 100)
		}), l.on("focus", this.onFocus = function() {
			clearTimeout(M)
		}));
		return l.on("scroll", this.onScroll = function() {
			var e = l.getScrollInfo(),
				n = l.getWrapperElement().getBoundingClientRect(),
				r = m + k.top - e.top,
				i = r - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
			if (v || (i += s.offsetHeight), i <= n.top || i >= n.bottom) return t.close();
			s.style.top = r + "px", s.style.left = g + k.left - e.left + "px"
		}), e.on(s, "dblclick", (function(e) {
			var n = a(s, e.target || e.srcElement);
			n && null != n.hintId && (i.changeActive(n.hintId), i.pick())
		})), e.on(s, "click", (function(e) {
			var n = a(s, e.target || e.srcElement);
			n && null != n.hintId && (i.changeActive(n.hintId), t.options.completeOnSingleClick && i.pick())
		})), e.on(s, "mousedown", (function() {
			setTimeout((function() {
				l.focus()
			}), 20)
		})), e.signal(r, "select", c[this.selectedHint], s.childNodes[this.selectedHint]), !0
	}

	function s(e, n, t, r) {
		if (e.async) e(n, r, t);
		else {
			var i = e(n, t);
			i && i.then ? i.then(r) : r(i)
		}
	}
	t.prototype = {
		close: function() {
			this.active() && (this.cm.state.completionActive = null, this.tick = null, this.cm.off("cursorActivity", this.activityFunc), this.widget && this.data && e.signal(this.data, "close"), this.widget && this.widget.close(), e.signal(this.cm, "endCompletion", this.cm))
		},
		active: function() {
			return this.cm.state.completionActive == this
		},
		pick: function(n, t) {
			var r = n.list[t];
			r.hint ? r.hint(this.cm, n, r) : this.cm.replaceRange(o(r), r.from || n.from, r.to || n.to, "complete"), e.signal(n, "pick", r), this.close()
		},
		cursorActivity: function() {
			this.debounce && (i(this.debounce), this.debounce = 0);
			var e = this.cm.getCursor(),
				n = this.cm.getLine(e.line);
			if (e.line != this.startPos.line || n.length - e.ch != this.startLen - this.startPos.ch || e.ch < this.startPos.ch || this.cm.somethingSelected() || e.ch && this.options.closeCharacters.test(n.charAt(e.ch - 1))) this.close();
			else {
				var t = this;
				this.debounce = r((function() {
					t.update()
				})), this.widget && this.widget.disable()
			}
		},
		update: function(e) {
			if (null != this.tick) {
				var n = this,
					t = ++this.tick;
				s(this.options.hint, this.cm, this.options, (function(r) {
					n.tick == t && n.finishUpdate(r, e)
				}))
			}
		},
		finishUpdate: function(n, t) {
			this.data && e.signal(this.data, "update");
			var r = this.widget && this.widget.picked || t && this.options.completeSingle;
			this.widget && this.widget.close(), this.data = n, n && n.list.length && (r && 1 == n.list.length ? this.pick(n, 0) : (this.widget = new l(this, n), e.signal(n, "shown")))
		}
	}, l.prototype = {
		close: function() {
			if (this.completion.widget == this) {
				this.completion.widget = null, this.hints.parentNode.removeChild(this.hints), this.completion.cm.removeKeyMap(this.keyMap);
				var e = this.completion.cm;
				this.completion.options.closeOnUnfocus && (e.off("blur", this.onBlur), e.off("focus", this.onFocus)), e.off("scroll", this.onScroll)
			}
		},
		disable: function() {
			this.completion.cm.removeKeyMap(this.keyMap);
			var e = this;
			this.keyMap = {
				Enter: function() {
					e.picked = !0
				}
			}, this.completion.cm.addKeyMap(this.keyMap)
		},
		pick: function() {
			this.completion.pick(this.data, this.selectedHint)
		},
		changeActive: function(t, r) {
			if (t >= this.data.list.length ? t = r ? this.data.list.length - 1 : 0 : t < 0 && (t = r ? 0 : this.data.list.length - 1), this.selectedHint != t) {
				var i = this.hints.childNodes[this.selectedHint];
				i && (i.className = i.className.replace(" " + n, "")), (i = this.hints.childNodes[this.selectedHint = t]).className += " " + n, i.offsetTop < this.hints.scrollTop ? this.hints.scrollTop = i.offsetTop - 3 : i.offsetTop + i.offsetHeight > this.hints.scrollTop + this.hints.clientHeight && (this.hints.scrollTop = i.offsetTop + i.offsetHeight - this.hints.clientHeight + 3), e.signal(this.data, "select", this.data.list[this.selectedHint], i)
			}
		},
		screenAmount: function() {
			return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1
		}
	}, e.registerHelper("hint", "auto", {
		resolve: function(n, t) {
			var r, i = n.getHelpers(t, "hint");
			if (i.length) {
				var o = function(e, n, t) {
					var r = function(e, n) {
						if (!e.somethingSelected()) return n;
						for (var t = [], r = 0; r < n.length; r++) n[r].supportsSelection && t.push(n[r]);
						return t
					}(e, i);
					! function i(o) {
						if (o == r.length) return n(null);
						s(r[o], e, t, (function(e) {
							e && e.list.length > 0 ? n(e) : i(o + 1)
						}))
					}(0)
				};
				return o.async = !0, o.supportsSelection = !0, o
			}
			return (r = n.getHelper(n.getCursor(), "hintWords")) ? function(n) {
				return e.hint.fromList(n, {
					words: r
				})
			} : e.hint.anyword ? function(n, t) {
				return e.hint.anyword(n, t)
			} : function() {}
		}
	}), e.registerHelper("hint", "fromList", (function(n, t) {
		var r, i = n.getCursor(),
			o = n.getTokenAt(i),
			a = e.Pos(i.line, o.start),
			l = i;
		o.start < i.ch && /\w/.test(o.string.charAt(i.ch - o.start - 1)) ? r = o.string.substr(0, i.ch - o.start) : (r = "", a = i);
		for (var s = [], c = 0; c < t.words.length; c++) {
			var u = t.words[c];
			u.slice(0, r.length) == r && s.push(u)
		}
		if (s.length) return {
			list: s,
			from: a,
			to: l
		}
	})), e.commands.autocomplete = e.showHint;
	var c = {
		hint: e.hint.auto,
		completeSingle: !0,
		alignWithWord: !0,
		closeCharacters: /[\s()\[\]{};:>,]/,
		closeOnUnfocus: !0,
		completeOnSingleClick: !0,
		container: null,
		customKeys: null,
		extraKeys: null
	};
	e.defineOption("hintOptions", null)
})),
function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
	"use strict";
	var n = /[\w$#]+/,
		t = ["METADATA", ["author", "Gill Bloggs", "Your name goes here. This will appear in the title screen of the game."],
			["color_palette", "arne", "By default, when you use colour names, they are pulled from a variation of <a href='http://androidarts.com/palette/16pal.htm'>Arne</a>'s 16-Colour palette. However, there are other palettes to choose from: <p> <ul> <li>1 - mastersystem </li> <li>2 - gameboycolour </li> <li>3 - amiga </li> <li>4 - arnecolors </li> <li>5 - famicom </li> <li>6 - atari </li> <li>7 - pastel </li> <li>8 - ega </li> <li>9 - amstrad </li> <li>10 - proteus_mellow </li> <li>11 - proteus_rich </li> <li>12 - proteus_night </li> <li>13 - c64 </li> <li>14 - whitingjp </li> </ul> <p> (you can also refer to them by their numerical index)"],
			["again_interval", "0.1", "The amount of time it takes an 'again' event to trigger."],
			["background_color", "blue", "Can accept a color name or hex code (in the form #412bbc). Controls the background color of title/message screens, as well as the background color of the website. Text_color is its sibling."],
			["debug", "", "This outputs the compiled instructions whenever you build your file."],
			["flickscreen", "8x5", "Setting flickscreen divides each level into WxH grids, and zooms the camera in so that the player can only see one at a time"],
			["homepage", "https://brainy7890.netlify.app/editor", "A link to your homepage!"],
			["key_repeat_interval", "0.1", "When you hold down a key, how long is the delay between repeated presses getting sent to the game (in seconds)?"],
			["noaction", "", "Hides the action key (X) instruction from the title screen, and does not respond when the player pressed it (outside of menus and cutscenes and the like)."],
			["norepeat_action", "", "The action button will only respond to individual presses, and not auto-trigger when held down."],
			["noundo", "", "Disables the undo key (Z)"],
			["norestart", "", "Disables the restart key (R)"],
			["realtime_interval", "", "The number indicates how long each realtime frame should be."],
			["require_player_movement", "", "If the player doesn't move, cancel the whole move."],
			["run_rules_on_level_start", "", "Applies the rules once on level-load, before the player has moved"],
			["scanline", "", "Applies a scanline visual effect"],
			["text_color", "orange", "Can accept a color name or hex code (in the form #412bbc). Controls the font color of title/message screens, as well as the font color in the website. Background_color is its sibling."],
			["title", "My Amazing Puzzle Game", "The name of your game. Appears on the title screen."],
			["throttle_movement", "", "For use in conjunction with realtime_interval - this stops you from moving crazy fast - repeated keypresses of the same movement direction will not increase your speed. This doesn't apply to the action button."],
			["verbose_logging", "", "As you play the game, spits out information about all rules applied as you play, and also allows visual inspection of what exactly the rules do by hovering over them with your mouse (or tapping them on touchscreen)."],
			["zoomscreen", "WxH", "Zooms the camera in to a WxH section of the map around the player, centered on the player."],
			["music", "", "Doesn't work yet. Put a direct url to play music."]
		],
		r = ["COLOR", "black", "white", "darkgray", "lightgray", "gray", "red", "darkred", "lightred", "brown", "darkbrown", "lightbrown", "orange", "yellow", "green", "darkgreen", "lightgreen", "blue", "lightblue", "darkblue", "purple", "pink", "transparent"],
		i = ["COMMAND", "sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again"],
		o = ["DIRECTION", "up", "down", "left", "right", "random", "horizontal", "vertical", "late", "rigid"],
		a = ["BRACKET", "startloop", "endloop"],
		l = ["DIRECTION", "up", "down", "left", "right", "moving", "stationary", "no", "randomdir", "random", "horizontal", "vertical", "orthogonal", "perpendicular", "parallel", "action"],
		s = ["SOUNDEVENT", "undo", "restart", "titlescreen", "startgame", "cancel", "endgame", "startlevel", "endlevel", "showmessage", "closemessage", "sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10"],
		c = ["SOUNDVERB", "move", "action", "create", "destroy", "cantmove"],
		u = ["DIRECTION", "up", "down", "left", "right", "horizontal", "vertical", "orthogonal"],
		d = ["LOGICWORD", "some", "on", "no", "all"],
		h = ["LOGICWORD", "and", "or"],
		f = ["mastersystem", "gameboycolour", "amiga", "arnecolors", "famicom", "atari", "pastel", "ega", "amstrad", "proteus_mellow", "proteus_rich", "proteus_night", "c64", "whitingjp"];

	function p(e, n, t) {
		var r = t.text,
			i = t.extra,
			o = t.tag;
		0 == r.length && (r = t.extra, i = t.text);
		var a = document.createElement("span");
		a.className += " cm-s-midnight ";
		var l = document.createElement("span"),
			s = document.createTextNode(r);
		if (l.appendChild(s), a.appendChild(l), null != o && (l.className += "cm-" + o), e.appendChild(a), i.length > 0) {
			var c = document.createElement("span");
			c.style.color = "orange";
			i = document.createTextNode(" " + i);
			c.appendChild(i), c.style.color = "orange", e.appendChild(i)
		}
	}
	e.registerHelper("hint", "anyword", (function(g, m) {
		for (var v = m && m.word || n, y = (m && m.range, g.getCursor()), b = g.getLine(y.line), w = y.ch, _ = w, C = b.substr(0, w); _ && v.test(b.charAt(_ - 1));) --_;
		var k = _ != w && b.slice(_, w),
			x = g.getTokenAt(y),
			S = x.state;
		if (!k || S.commentLevel > 0) return {
			list: []
		};
		var M = !1,
			E = !1,
			R = [],
			T = [];
		switch (S.section) {
			case "objects":
				2 == S.objects_section && R.push(r);
				break;
			case "legend":
				T = (I = C.toLowerCase().split(/[\p{Z}\s]/u).filter((function(e) {
					return "" !== e
				}))).filter((e => -1 === h.indexOf(e))), C.indexOf("=") >= 0 && (C.trim().split(/\s+/).length % 2 == 1 ? M = !0 : R.push(h));
				break;
			case "sounds":
				var L = S.current_line_wip_array.length - 1;
				if (L > 0 && "ERROR" === S.current_line_wip_array[L]) R.push(c), R.push(u), R.push(s), M = !0, E = !0;
				else if (S.current_line_wip_array.length <= 1) R.push(s), M = !0, E = !0;
				else {
					switch (S.current_line_wip_array[L][1]) {
						case "SOUNDEVENT":
							break;
						case "NAME":
							R.push(c);
							break;
						case "SOUNDVERB":
						case "DIRECTION":
							R.push(u)
					}
				}
				break;
			case "collisionlayers":
				var I;
				T = I = C.toLowerCase().split(/[,\p{Z}\s]/u).filter((function(e) {
					return "" !== e
				})), M = !0, E = !0;
				break;
			case "rules":
				-1 == C.indexOf("[") ? (R.push(o), R.push(a)) : R.push(l), C.indexOf("->") >= 0 && R.push(i), M = !0;
				break;
			case "winconditions":
				C.trim().split(/\s+/).length % 2 == 0 && (M = !0), R.push(d);
				break;
			case "levels":
				0 === "message".indexOf(C.trim()) && R.push(["MESSAGE_VERB", "message"]);
				break;
			default:
				if ((J = C.toLowerCase()).indexOf("background_color") >= 0 || J.indexOf("text_color") >= 0) R.push(r);
				else {
					var O = C.trim().split(/\s+/);
					O.length < 2 ? R.push(t) : 2 == O.length && "color_palette" == O[0].toLowerCase() && R.push(f)
				}
		}
		k = k.toLowerCase();
		var A = m && m.list || [],
			D = {};
		if (M) {
			var N = S.objects;
			for (var B in N)
				if (N.hasOwnProperty(B)) {
					var P = (U = B).toLowerCase();
					if (!(k && 0 != P.lastIndexOf(k, 0) || Object.prototype.hasOwnProperty.call(D, P))) {
						D[P] = !0;
						var F = S.original_case_names[U];
						A.push({
							text: F,
							extra: "",
							tag: "NAME",
							render: p
						})
					}
				} var j = [S.legend_synonyms];
			j.push(S.legend_properties), E || j.push(S.legend_aggregates);
			for (var H = 0; H < j.length; H++)
				for (var z = j[H], W = 0; W < z.length; W++) {
					var U;
					P = (U = z[W][0]).toLowerCase();
					if (!(k && 0 != P.lastIndexOf(k, 0) || Object.prototype.hasOwnProperty.call(D, P))) {
						D[P] = !0;
						F = S.original_case_names[U];
						A.push({
							text: F,
							extra: "",
							tag: "NAME",
							render: p
						})
					}
				}
		}
		for (H = 0; H < R.length; H++) {
			var V = R[H],
				q = V[0];
			for (W = 1; W < V.length; W++) {
				var G = V[W],
					X = "";
				"string" != typeof G && (G.length > 1 && (X = G[1]), G = G[0]);
				P = (P = G).toLowerCase();
				if (!(k && 0 != P.lastIndexOf(k, 0) || Object.prototype.hasOwnProperty.call(D, P))) {
					D[P] = !0;
					var Y = q;
					"COLOR" === Y && (Y = "COLOR-" + G.toUpperCase()), A.push({
						text: G,
						extra: X,
						tag: Y,
						render: p
					})
				}
			}
		}
		if (T.length > 0) {
			T[T.length - 1] === k && I.pop();
			for (H = 0; H < A.length; H++) {
				var J = A[H].text.toLowerCase();
				T.indexOf(J) >= 0 && (A.splice(H, 1), H--)
			}
		}
		1 === A.length && A[0].text.toLowerCase() === k && (A = []);
		for (H = 1; H < A.length; H++)
			if (A[H].text.toLowerCase() === k) {
				var K = A[H];
				A.splice(H, 1), A.unshift(K);
				break
			} return x.string.trim().length > k.length && (A = []), {
			list: A,
			from: e.Pos(y.line, _),
			to: e.Pos(y.line, w)
		}
	})), e.ExcludedIntelliSenseTriggerKeys = {
		9: "tab",
		13: "enter",
		16: "shift",
		17: "ctrl",
		18: "alt",
		19: "pause",
		20: "capslock",
		27: "escape",
		33: "pageup",
		34: "pagedown",
		35: "end",
		36: "home",
		37: "left",
		38: "up",
		39: "right",
		40: "down",
		45: "insert",
		91: "left window key",
		92: "right window key",
		93: "select",
		107: "add",
		109: "subtract",
		110: "decimal point",
		111: "divide",
		112: "f1",
		113: "f2",
		114: "f3",
		115: "f4",
		116: "f5",
		117: "f6",
		118: "f7",
		119: "f8",
		120: "f9",
		121: "f10",
		122: "f11",
		123: "f12",
		144: "numlock",
		145: "scrolllock",
		186: "semicolon",
		187: "equalsign",
		188: "comma",
		190: "period",
		191: "slash",
		192: "graveaccent",
		220: "backslash",
		222: "quote"
	}
})),
function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
	"use strict";
	var n = {
			lineComment: "//"
		},
		t = /[^\s\u00a0]/,
		r = e.Pos;
	e.cmpPos;

	function i(e, n) {
		var t = e.getMode();
		return !1 !== t.useInnerComments && t.innerMode ? e.getModeAt(n) : t
	}
	e.commands.toggleComment = function(e) {
		e.toggleComment()
	}, e.defineExtension("toggleComment", (function(e) {
		e || (e = n);
		for (var t = this, i = 1 / 0, o = this.listSelections(), a = null, l = o.length - 1; l >= 0; l--) {
			var s = o[l].from(),
				c = o[l].to();
			s.line >= i || (c.line >= i && (c = r(i, 0)), i = s.line, null == a ? t.uncomment(s, c, e) ? a = "un" : (t.lineComment(s, c, e), a = "line") : "un" == a ? t.uncomment(s, c, e) : t.lineComment(s, c, e))
		}
	})), e.defineExtension("lineComment", (function(e, o, a) {
		a || (a = n);
		var l = this,
			s = (i(l, e), l.getLine(e.line));
		if (null != s && (c = e, u = s, !/\bstring\b/.test(l.getTokenTypeAt(r(c.line, 0))) || /^[\'\"\`]/.test(u))) {
			var c, u, d = Math.min(0 != o.ch || o.line == e.line ? o.line + 1 : o.line, l.lastLine() + 1),
				h = null == a.padding ? " " : a.padding,
				f = a.commentBlankLines || e.line == o.line;
			l.operation((function() {
				for (var n = e.line; n < d; ++n) {
					var i = l.getLine(n);
					(f || t.test(i)) && (l.replaceRange("(" + h, r(n, 0)), i = l.getLine(n), l.replaceRange(h + ")", r(n, i.length)))
				}
			}))
		}
	})), e.defineExtension("uncomment", (function(e, o, a) {
		a || (a = n);
		var l, s = this,
			c = (i(s, e), Math.min(0 != o.ch || o.line == e.line ? o.line : o.line - 1, s.lastLine())),
			u = Math.min(e.line, c),
			d = [],
			h = null == a.padding ? " " : a.padding;
		e: {
			for (var f = u; f <= c; ++f) {
				var p = s.getLine(f),
					g = p.indexOf("("),
					m = p.lastIndexOf(")");
				if (g > -1 && !/comment/.test(s.getTokenTypeAt(r(f, g + 1))) && (g = -1), -1 == g && t.test(p)) break e;
				if (g > -1 && t.test(p.slice(0, g))) break e;
				if (m > -1 && !/comment/.test(s.getTokenTypeAt(r(f, m))) && (m = -1), -1 == m && t.test(p)) break e;
				if (m > -1 && t.test(p.slice(m + 1))) break e;
				d.push(p)
			}
			if (s.operation((function() {
					for (var e = u; e <= c; ++e) {
						var n = d[e - u],
							t = n.indexOf("("),
							i = t + 1,
							o = n.indexOf(")"),
							a = o + 1;
						t < 0 || o < 0 || (n.slice(a - 1 - h.length, a - 1) == h && (o -= h.length), n.slice(i, i + h.length) == h && (i += h.length), l = !0, s.replaceRange("", r(e, o), r(e, a)), s.replaceRange("", r(e, t), r(e, i)))
					}
				})), l) return !0
		}
		return !1
	}))
})), colorPalettesAliases = {
	1: "mastersystem",
	2: "gameboycolour",
	3: "amiga",
	4: "arnecolors",
	5: "famicom",
	6: "atari",
	7: "pastel",
	8: "ega",
	9: "amstrad",
	10: "proteus_mellow",
	11: "proteus_rich",
	12: "proteus_night",
	13: "c64",
	14: "whitingjp"
}, colorPalettes = {
	mastersystem: {
		black: "#000000",
		white: "#FFFFFF",
		grey: "#555555",
		darkgrey: "#555500",
		lightgrey: "#AAAAAA",
		gray: "#555555",
		darkgray: "#555500",
		lightgray: "#AAAAAA",
		red: "#FF0000",
		darkred: "#AA0000",
		lightred: "#FF5555",
		brown: "#AA5500",
		darkbrown: "#550000",
		lightbrown: "#FFAA00",
		orange: "#FF5500",
		yellow: "#FFFF55",
		green: "#55AA00",
		darkgreen: "#005500",
		lightgreen: "#AAFF00",
		blue: "#5555AA",
		lightblue: "#AAFFFF",
		darkblue: "#000055",
		purple: "#550055",
		pink: "#FFAAFF"
	},
	gameboycolour: {
		black: "#000000",
		white: "#FFFFFF",
		grey: "#7F7F7C",
		darkgrey: "#3E3E44",
		lightgrey: "#BAA7A7",
		gray: "#7F7F7C",
		darkgray: "#3E3E44",
		lightgray: "#BAA7A7",
		red: "#A7120C",
		darkred: "#880606",
		lightred: "#BA381F",
		brown: "#57381F",
		darkbrown: "#3E2519",
		lightbrown: "#8E634B",
		orange: "#BA4B32",
		yellow: "#C0BA6F",
		green: "#517525",
		darkgreen: "#385D12",
		lightgreen: "#6F8E44",
		blue: "#5D6FA7",
		lightblue: "#8EA7A7",
		darkblue: "#4B575D",
		purple: "#3E3E44",
		pink: "#BA381F"
	},
	amiga: {
		black: "#000000",
		white: "#FFFFFF",
		grey: "#BBBBBB",
		darkgrey: "#333333",
		lightgrey: "#FFEEDD",
		gray: "#BBBBBB",
		darkgray: "#333333",
		lightgray: "#FFEEDD",
		red: "#DD1111",
		darkred: "#990000",
		lightred: "#FF4422",
		brown: "#663311",
		darkbrown: "#331100",
		lightbrown: "#AA6644",
		orange: "#FF6644",
		yellow: "#FFDD66",
		green: "#448811",
		darkgreen: "#335500",
		lightgreen: "#88BB77",
		blue: "#8899DD",
		lightblue: "#BBDDEE",
		darkblue: "#666688",
		purple: "#665555",
		pink: "#997788"
	},
	arnecolors: {
		black: "#000000",
		white: "#FFFFFF",
		grey: "#9d9d9d",
		darkgrey: "#697175",
		lightgrey: "#cccccc",
		gray: "#9d9d9d",
		darkgray: "#697175",
		lightgray: "#cccccc",
		red: "#be2633",
		darkred: "#732930",
		lightred: "#e06f8b",
		brown: "#a46422",
		darkbrown: "#493c2b",
		lightbrown: "#eeb62f",
		orange: "#eb8931",
		yellow: "#f7e26b",
		green: "#44891a",
		darkgreen: "#2f484e",
		lightgreen: "#a3ce27",
		blue: "#1d57f7",
		lightblue: "#B2DCEF",
		darkblue: "#1B2632",
		purple: "#342a97",
		pink: "#de65e2"
	},
	famicom: {
		black: "#000000",
		white: "#ffffff",
		grey: "#7c7c7c",
		darkgrey: "#080808",
		lightgrey: "#bcbcbc",
		gray: "#7c7c7c",
		darkgray: "#080808",
		lightgray: "#bcbcbc",
		red: "#f83800",
		darkred: "#881400",
		lightred: "#f87858",
		brown: "#AC7C00",
		darkbrown: "#503000",
		lightbrown: "#FCE0A8",
		orange: "#FCA044",
		yellow: "#F8B800",
		green: "#00B800",
		darkgreen: "#005800",
		lightgreen: "#B8F8B8",
		blue: "#0058F8",
		lightblue: "#3CBCFC",
		darkblue: "#0000BC",
		purple: "#6644FC",
		pink: "#F878F8"
	},
	atari: {
		black: "#000000",
		white: "#FFFFFF",
		grey: "#909090",
		darkgrey: "#404040",
		lightgrey: "#b0b0b0",
		gray: "#909090",
		darkgray: "#404040",
		lightgray: "#b0b0b0",
		red: "#A03C50",
		darkred: "#700014",
		lightred: "#DC849C",
		brown: "#805020",
		darkbrown: "#703400",
		lightbrown: "#CB9870",
		orange: "#CCAC70",
		yellow: "#ECD09C",
		green: "#58B06C",
		darkgreen: "#006414",
		lightgreen: "#70C484",
		blue: "#1C3C88",
		lightblue: "#6888C8",
		darkblue: "#000088",
		purple: "#3C0080",
		pink: "#B484DC"
	},
	pastel: {
		black: "#000000",
		white: "#FFFFFF",
		grey: "#3e3e3e",
		darkgrey: "#313131",
		lightgrey: "#9cbcbc",
		gray: "#3e3e3e",
		darkgray: "#313131",
		lightgray: "#9cbcbc",
		red: "#f56ca2",
		darkred: "#a63577",
		lightred: "#ffa9cf",
		brown: "#b58c53",
		darkbrown: "#787562",
		lightbrown: "#B58C53",
		orange: "#EB792D",
		yellow: "#FFe15F",
		green: "#00FF4F",
		darkgreen: "#2b732c",
		lightgreen: "#97c04f",
		blue: "#0f88d3",
		lightblue: "#00fffe",
		darkblue: "#293a7b",
		purple: "#ff6554",
		pink: "#eb792d"
	},
	ega: {
		black: "#000000",
		white: "#ffffff",
		grey: "#555555",
		darkgrey: "#555555",
		lightgrey: "#aaaaaa",
		gray: "#555555",
		darkgray: "#555555",
		lightgray: "#aaaaaa",
		red: "#ff5555",
		darkred: "#aa0000",
		lightred: "#ff55ff",
		brown: "#aa5500",
		darkbrown: "#aa5500",
		lightbrown: "#ffff55",
		orange: "#ff5555",
		yellow: "#ffff55",
		green: "#00aa00",
		darkgreen: "#00aaaa",
		lightgreen: "#55ff55",
		blue: "#5555ff",
		lightblue: "#55ffff",
		darkblue: "#0000aa",
		purple: "#aa00aa",
		pink: "#ff55ff"
	},
	proteus_mellow: {
		black: "#3d2d2e",
		white: "#ddf1fc",
		grey: "#9fb2d4",
		darkgrey: "#7b8272",
		lightgrey: "#a4bfda",
		gray: "#9fb2d4",
		darkgray: "#7b8272",
		lightgray: "#a4bfda",
		red: "#9d5443",
		darkred: "#8c5b4a",
		lightred: "#94614c",
		brown: "#89a78d",
		darkbrown: "#829e88",
		lightbrown: "#aaae97",
		orange: "#d1ba86",
		yellow: "#d6cda2",
		green: "#75ac8d",
		darkgreen: "#8fa67f",
		lightgreen: "#8eb682",
		blue: "#88a3ce",
		lightblue: "#a5adb0",
		darkblue: "#5c6b8c",
		purple: "#d39fac",
		pink: "#c8ac9e"
	},
	proteus_night: {
		black: "#010912",
		white: "#fdeeec",
		grey: "#051d40",
		darkgrey: "#091842",
		lightgrey: "#062151",
		gray: "#051d40",
		darkgray: "#091842",
		lightgray: "#062151",
		red: "#ad4576",
		darkred: "#934765",
		lightred: "#ab6290",
		brown: "#61646b",
		darkbrown: "#3d2d2d",
		lightbrown: "#8393a0",
		orange: "#0a2227",
		yellow: "#0a2541",
		green: "#75ac8d",
		darkgreen: "#0a2434",
		lightgreen: "#061f2e",
		blue: "#0b2c79",
		lightblue: "#809ccb",
		darkblue: "#08153b",
		purple: "#666a87",
		pink: "#754b4d"
	},
	proteus_rich: {
		black: "#6f686f",
		white: "#d1b1e2",
		grey: "#b9aac1",
		darkgrey: "#8e8b84",
		lightgrey: "#c7b5cd",
		gray: "#b9aac1",
		darkgray: "#8e8b84",
		lightgray: "#c7b5cd",
		red: "#a11f4f",
		darkred: "#934765",
		lightred: "#c998ad",
		brown: "#89867d",
		darkbrown: "#797f75",
		lightbrown: "#ab9997",
		orange: "#ce8c5c",
		yellow: "#f0d959",
		green: "#75bc54",
		darkgreen: "#599d79",
		lightgreen: "#90cf5c",
		blue: "#8fd0ec",
		lightblue: "#bcdce7",
		darkblue: "#0b2c70",
		purple: "#9b377f",
		pink: "#cd88e5"
	},
	amstrad: {
		black: "#000000",
		white: "#ffffff",
		grey: "#7f7f7f",
		darkgrey: "#636363",
		lightgrey: "#afafaf",
		gray: "#7f7f7f",
		darkgray: "#636363",
		lightgray: "#afafaf",
		red: "#ff0000",
		darkred: "#7f0000",
		lightred: "#ff7f7f",
		brown: "#ff7f00",
		darkbrown: "#7f7f00",
		lightbrown: "#ffff00",
		orange: "#ff007f",
		yellow: "#ffff7f",
		green: "#01ff00",
		darkgreen: "#007f00",
		lightgreen: "#7fff7f",
		blue: "#0000ff",
		lightblue: "#7f7fff",
		darkblue: "#00007f",
		purple: "#7f007f",
		pink: "#ff7fff"
	},
	c64: {
		black: "#000000",
		white: "#ffffff",
		grey: "#6C6C6C",
		darkgrey: "#444444",
		lightgrey: "#959595",
		gray: "#6C6C6C",
		darkgray: "#444444",
		lightgray: "#959595",
		red: "#68372B",
		darkred: "#3f1e17",
		lightred: "#9A6759",
		brown: "#433900",
		darkbrown: "#221c02",
		lightbrown: "#6d5c0d",
		orange: "#6F4F25",
		yellow: "#B8C76F",
		green: "#588D43",
		darkgreen: "#345129",
		lightgreen: "#9AD284",
		blue: "#6C5EB5",
		lightblue: "#70A4B2",
		darkblue: "#352879",
		purple: "#6F3D86",
		pink: "#b044ac"
	},
	whitingjp: {
		black: "#202527",
		white: "#eff8fd",
		grey: "#7b7680",
		darkgrey: "#3c3b44",
		lightgrey: "#bed0d7",
		gray: "#7b7680",
		darkgray: "#3c3b44",
		lightgray: "#bed0d7",
		red: "#bd194b",
		darkred: "#6b1334",
		lightred: "#ef2358",
		brown: "#b52e1c",
		darkbrown: "#681c12",
		lightbrown: "#e87b45",
		orange: "#ff8c10",
		yellow: "#fbd524",
		green: "#36bc3c",
		darkgreen: "#317610",
		lightgreen: "#8ce062",
		blue: "#3f62c6",
		lightblue: "#57bbe0",
		darkblue: "#2c2fa0",
		purple: "#7037d9",
		pink: "#ec2b8f"
	}
};
var reg_color_names = /(black|white|darkgray|lightgray|gray|grey|darkgrey|lightgrey|red|darkred|lightred|brown|darkbrown|lightbrown|orange|yellow|green|darkgreen|lightgreen|blue|lightblue|darkblue|purple|pink|transparent)\s*/,
	reg_color = /(black|white|gray|darkgray|lightgray|grey|darkgrey|lightgrey|red|darkred|lightred|brown|darkbrown|lightbrown|orange|yellow|green|darkgreen|lightgreen|blue|lightblue|darkblue|purple|pink|transparent|#(?:[0-9a-f]{3}){1,2})\s*/;

function createSprite(e, n, t, r) {
	void 0 === t && (t = [state.bgcolor, state.fgcolor]);
	var i = makeSpriteCanvas(e),
		o = i.getContext("2d");
	o.clearRect(0, 0, cellwidth, cellheight);
	var a = n[0].length,
		l = n.length,
		s = ~~(cellwidth / (a + (0 | r))),
		c = ~~(cellheight / (l + (0 | r))),
		u = c;
	"scanline" in state.metadata && (u = Math.ceil(c / 2)), o.fillStyle = state.fgcolor;
	for (var d = 0; d < l; d++)
		for (var h = 0; h < a; h++) {
			var f = n[d][h];
			if (f >= 0) {
				var p = d * c | 0,
					g = h * s | 0;
				o.fillStyle = t[f], o.fillRect(g, p, s, u)
			}
		}
	return i
}

function regenText(e, n) {
	for (var t in textImages = {}, titleImage) {
		var r = titleImage[t];
		for (var i in r) {
			var o = r[i];
			font.hasOwnProperty(o) && !textImages.hasOwnProperty(o) && (fontstr = font[o].split("\n").map((e => e.trim().split("").map((e => parseInt(e))))), fontstr.shift(), textImages[o] = createSprite("char" + o, fontstr, void 0, 1))
		}
	}
}
var spriteimages, glyphImagesCorrespondance, glyphImages, glyphHighlight, glyphHighlightDiff, glyphHighlightResize, glyphPrintButton, glyphMouseOver, editor_s_grille = [
	[0, 1, 1, 1, 0],
	[1, 0, 0, 0, 0],
	[0, 1, 1, 1, 0],
	[0, 0, 0, 0, 1],
	[0, 1, 1, 1, 0]
];

function regenSpriteImages() {
	if (textMode) return spriteimages = [], void regenText();
	if (!0 === IDE && (textImages.editor_s = createSprite("chars", editor_s_grille, void 0)), 0 !== state.levels.length) {
		spriteimages = [];
		for (var e = 0; e < sprites.length; e++) null != sprites[e] && (spriteimages[e] = createSprite(e.toString(), sprites[e].dat, sprites[e].colors));
		canOpenEditor && generateGlyphImages()
	}
}
var canvas, ctx, x, y, cellwidth, cellheight, xoffset, yoffset, lastDownTarget, glyphSelectedIndex = 0,
	editorRowCount = 1,
	editorGlyphMovements = [],
	canvasdict = {};

function makeSpriteCanvas(e) {
	var n;
	return e in canvasdict ? n = canvasdict[e] : (n = document.createElement("canvas"), canvasdict[e] = n), n.width = cellwidth, n.height = cellheight, n
}

function generateGlyphImages() {
	if (0 !== cellwidth && 0 !== cellheight) {
		for (var e of (glyphImagesCorrespondance = [], glyphImages = [], seenobjects = {}, state.glyphOrder))
			if (1 == e.length && state.glyphDict.hasOwnProperty(e)) {
				var n = state.glyphDict[e],
					t = n.join(",");
				if (seenobjects.hasOwnProperty(t)) continue;
				var r = makeSpriteCanvas("C" + e),
					i = r.getContext("2d");
				glyphImagesCorrespondance.push(e), seenobjects[t] = !0;
				for (var o = 0; o < n.length; o++) {
					var a = n[o]; - 1 !== a && i.drawImage(spriteimages[a], 0, 0)
				}
				glyphImages.push(r)
			} if (IDE) {
			(i = (glyphHighlight = makeSpriteCanvas("highlight")).getContext("2d")).fillStyle = "#FFFFFF", i.fillRect(0, 0, cellwidth, 1), i.fillRect(0, 0, 1, cellheight), i.fillRect(0, cellheight - 1, cellwidth, 1), i.fillRect(cellwidth - 1, 0, 1, cellheight), glyphPrintButton = textImages.editor_s, (i = (glyphHighlightDiff = makeSpriteCanvas("glyphHighlightDiff")).getContext("2d")).fillStyle = state.bgcolor, i.fillRect(0, 0, cellwidth, 2), i.fillRect(0, 0, 2, cellheight), i.fillRect(0, cellheight - 2, cellwidth, 2), i.fillRect(cellwidth - 2, 0, 2, cellheight), i.fillStyle = state.fgcolor, i.fillRect(0, 0, cellwidth, 1), i.fillRect(0, 0, 1, cellheight), i.fillRect(0, cellheight - 1, cellwidth, 1), i.fillRect(cellwidth - 1, 0, 1, cellheight), glyphPrintButton = textImages.editor_s, (i = (glyphHighlightResize = makeSpriteCanvas("highlightresize")).getContext("2d")).fillStyle = "#FFFFFF";
			var l = cellwidth / 2 - 1 | 0,
				s = cellwidth - l - 1 - l,
				c = cellheight / 2 - 1 | 0,
				u = cellheight - c - 1 - l;
			i.fillRect(l, 0, s, cellheight), i.fillRect(0, c, cellwidth, u), (i = (glyphMouseOver = makeSpriteCanvas("glyphMouseOver")).getContext("2d")).fillStyle = "yellow", i.fillRect(0, 0, cellwidth, 2), i.fillRect(0, 0, 2, cellheight), i.fillRect(0, cellheight - 2, cellwidth, 2), i.fillRect(cellwidth - 2, 0, 2, cellheight);
			const e = [
				[
					[3, 2],
					[5, 0],
					[7, 2]
				],
				[
					[3, 8],
					[5, 10],
					[7, 8]
				],
				[
					[2, 3],
					[0, 5],
					[2, 7]
				],
				[
					[7, 3],
					[10, 5],
					[7, 7]
				],
				[
					[3, 5],
					[5, 7],
					[7, 5],
					[5, 3]
				],
				[
					[3, 3],
					[5, 3],
					[5, 4],
					[4, 4],
					[4, 5],
					[3, 5]
				]
			];
			for (o = 0; o < e.length; o++) {
				editorGlyphMovements[o] = makeSpriteCanvas("editorGlyphMovements" + o);
				var d = e[o];
				(i = editorGlyphMovements[o].getContext("2d")).lineWidth = 1, i.fillStyle = state.bgcolor, i.strokeStyle = state.fgcolor, i.beginPath(), i.moveTo(d[0][0] * cellwidth / 10, d[0][1] * cellheight / 10);
				for (var h = 1; h < d.length; h++) i.lineTo(d[h][0] * cellwidth / 10, d[h][1] * cellheight / 10);
				i.closePath(), i.fill(), i.stroke()
			}
		}
	}
}

function glyphCount() {
	var e = 0;
	for (var n of state.glyphOrder) 1 == n.length && state.glyphDict.hasOwnProperty(n) && e++;
	return e
}

function redraw() {
	if (0 !== cellwidth && 0 !== cellheight)
		if (void 0 === spriteimages && regenSpriteImages(), textMode) {
			ctx.fillStyle = state.bgcolor, ctx.fillRect(0, 0, canvas.width, canvas.height);
			for (var e = 0; e < titleWidth; e++)
				for (var n = 0; n < titleHeight; n++) {
					var t = titleImage[n].charAt(e);
					if (t in textImages) {
						var r = textImages[t];
						ctx.drawImage(r, xoffset + e * cellwidth, yoffset + n * cellheight)
					}
				}
		} else {
			var i = level;
			null !== diffToVisualize && ((i = new Level(-1, diffToVisualize.width, diffToVisualize.height, diffToVisualize.layerCount, diffToVisualize.objects)).movements = diffToVisualize.movements, i.rigidMovementAppliedMask = diffToVisualize.rigidMovementAppliedMask), ctx.fillStyle = state.bgcolor, ctx.fillRect(0, 0, canvas.width, canvas.height);
			var o = 0,
				a = screenwidth,
				l = 0,
				s = screenheight;
			if (levelEditorOpened) {
				var c = glyphCount();
				a -= 2, s -= 2 + (editorRowCount = Math.ceil(c / (screenwidth - 1)))
			} else if (flickscreen) {
				if ((h = getPlayerPositions()).length > 0) {
					var u = (f = h[0]) / i.height | 0,
						d = f % i.height | 0;
					o = (u / screenwidth | 0) * screenwidth, l = (d / screenheight | 0) * screenheight, a = Math.min(o + screenwidth, i.width), s = Math.min(l + screenheight, i.height), oldflickscreendat = [o, l, a, s]
				} else oldflickscreendat.length > 0 && (o = oldflickscreendat[0], l = oldflickscreendat[1], a = oldflickscreendat[2], s = oldflickscreendat[3])
			} else if (zoomscreen) {
				var h;
				if ((h = getPlayerPositions()).length > 0) {
					var f;
					u = (f = h[0]) / i.height | 0, d = f % i.height | 0;
					o = Math.max(Math.min(u - (screenwidth / 2 | 0), i.width - screenwidth), 0), l = Math.max(Math.min(d - (screenheight / 2 | 0), i.height - screenheight), 0), a = Math.min(o + screenwidth, i.width), s = Math.min(l + screenheight, i.height), oldflickscreendat = [o, l, a, s]
				} else oldflickscreendat.length > 0 && (o = oldflickscreendat[0], l = oldflickscreendat[1], a = oldflickscreendat[2], s = oldflickscreendat[3])
			}
			for (e = o; e < a; e++)
				for (n = l; n < s; n++)
					for (var p = n + e * i.height, g = i.getCellInto(p, _o12), m = 0; m < state.objectCount; m++)
						if (0 != g.get(m)) {
							r = spriteimages[m];
							ctx.drawImage(r, xoffset + (e - o) * cellwidth, yoffset + (n - l) * cellheight)
						} if (null !== diffToVisualize) {
				for (var v = diffToVisualize.lineNumber - 1; v >= -1 && !debug_visualisation_array[diffToVisualize.turnIndex].hasOwnProperty(v); v--);
				var y = debug_visualisation_array[diffToVisualize.turnIndex][v],
					b = new Level(-1, y.width, y.height, y.layerCount, y.objects);
				b.movements = y.movements, b.rigidMovementAppliedMask = y.rigidMovementAppliedMask;
				for (e = o; e < a; e++)
					for (n = l; n < s; n++) {
						p = n + e * i.height;
						var w = b.getMovements(p),
							_ = i.getMovements(p),
							C = b.getCellInto(p, _o11);
						g = i.getCellInto(p, _o12);
						_.equals(w) && g.equals(C) || ctx.drawImage(glyphHighlightDiff, xoffset + (e - o) * cellwidth, yoffset + (n - l) * cellheight)
					}
				for (e = o; e < a; e++)
					for (n = l; n < s; n++) {
						p = n + e * i.height, _ = i.getMovements(p);
						for (var k = 0; k < i.layerCount; k++) {
							var x = _.getshiftor(31, 5 * k);
							for (m = 0; m < 5; m++) 0 != (x & Math.pow(2, m)) && ctx.drawImage(editorGlyphMovements[m], xoffset + (e - o) * cellwidth, yoffset + (n - l) * cellheight)
						}
					}
				for (e = o; e < a; e++)
					for (n = l; n < s; n++) {
						p = n + e * i.height;
						var S = i.getRigids(p);
						for (k = 0; k < i.layerCount; k++) {
							0 !== S.getshiftor(31, 5 * k) && ctx.drawImage(editorGlyphMovements[5], xoffset + (e - o) * cellwidth, yoffset + (n - l) * cellheight)
						}
					}
			}
			levelEditorOpened && drawEditorIcons(o, l)
		}
}

function drawEditorIcons(e, n) {
	glyphImages.length;
	var t = glyphImages.length - 0;
	ctx.drawImage(glyphPrintButton, xoffset - cellwidth, yoffset - cellheight * (1 + editorRowCount)), mouseCoordY === -1 - editorRowCount && -1 === mouseCoordX && ctx.drawImage(glyphMouseOver, xoffset - cellwidth, yoffset - cellheight * (1 + editorRowCount));
	for (var r = mouseCoordX + (screenwidth - 1) * (l = editorRowCount - (-mouseCoordY - 2) - 1), i = 0; i < t; i++) {
		var o = glyphImages[0 + i],
			a = i % (screenwidth - 1),
			l = i / (screenwidth - 1) | 0;
		ctx.drawImage(o, xoffset + a * cellwidth, yoffset + l * cellheight - cellheight * (1 + editorRowCount)), mouseCoordX >= 0 && mouseCoordX < screenwidth - 1 && r === i && ctx.drawImage(glyphMouseOver, xoffset + a * cellwidth, yoffset + l * cellheight - cellheight * (1 + editorRowCount)), i === glyphSelectedIndex && ctx.drawImage(glyphHighlight, xoffset + a * cellwidth, yoffset + l * cellheight - cellheight * (1 + editorRowCount))
	}
	var s = "",
		c = null;
	if (mouseCoordX >= 0 && mouseCoordX < screenwidth && r >= 0 && r < t) {
		const e = glyphImagesCorrespondance[0 + r];
		s = e, e in state.synonymsDict ? s += " = " + state.synonymsDict[e] : e in state.aggregatesDict && (s += " = " + state.aggregatesDict[e].join(" and "))
	}
	if (-1 === r) s = "print level to console";
	else if (mouseCoordX >= 0 && mouseCoordY >= 0 && mouseCoordX < screenwidth && mouseCoordY < screenheight - editorRowCount - 2) {
		const t = level.getCellInto(mouseCoordY + n + (mouseCoordX + e) * level.height, _o12);
		null !== (c = state.idDict.filter(((e, n) => 0 != t.get(n)))) && (s = c.join(", "))
	}
	s.length > 0 && (ctx.fillStyle = state.fgcolor, ctx.font = '16px "Source Sans Pro", Helvetica, Arial, sans-serif', ctx.fillText(s, xoffset, yoffset - .4 * cellheight)), mouseCoordX >= -1 && mouseCoordY >= -1 && mouseCoordX < screenwidth - 1 && mouseCoordY < screenheight - 1 - editorRowCount && (-1 == mouseCoordX || -1 == mouseCoordY || mouseCoordX == screenwidth - 2 || mouseCoordY === screenheight - 2 - editorRowCount ? ctx.drawImage(glyphHighlightResize, xoffset + mouseCoordX * cellwidth, yoffset + mouseCoordY * cellheight) : ctx.drawImage(glyphHighlight, xoffset + mouseCoordX * cellwidth, yoffset + mouseCoordY * cellheight))
}
window.addEventListener("resize", (function() {
	canvasResize()
}), !1), canvas = document.getElementById("gameCanvas"), ctx = canvas.getContext("2d"), x = 0, y = 0;
var oldcellwidth = 0,
	oldcellheight = 0,
	oldtextmode = -1,
	oldfgcolor = -1,
	forceRegenImages = !1;

function canvasResize(e) {
	if (e ||= level, canvas.width = canvas.parentNode.clientWidth, canvas.height = canvas.parentNode.clientHeight, screenwidth = e.width, screenheight = e.height, void 0 !== state)
		if (flickscreen = void 0 !== state.metadata.flickscreen, zoomscreen = void 0 !== state.metadata.zoomscreen, levelEditorOpened) {
			screenwidth += 2;
			var n = glyphCount();
			editorRowCount = Math.ceil(n / (screenwidth - 1)), screenheight += 2 + editorRowCount
		} else flickscreen ? (screenwidth = state.metadata.flickscreen[0], screenheight = state.metadata.flickscreen[1]) : zoomscreen && (screenwidth = state.metadata.zoomscreen[0], screenheight = state.metadata.zoomscreen[1]);
	textMode && (screenwidth = titleWidth, screenheight = titleHeight), cellwidth = canvas.width / screenwidth, cellheight = canvas.height / screenheight;
	var t = 5,
		r = 5;
	textMode && (t = 6, r = font.X.split("\n").map((e => e.trim())).length);
	cellwidth = t * Math.max(~~(cellwidth / t), 1), cellheight = r * Math.max(~~(cellheight / r), 1), xoffset = 0, yoffset = 0, cellwidth / t > cellheight / r ? (cellwidth = cellheight * t / r, xoffset = (canvas.width - cellwidth * screenwidth) / 2, yoffset = (canvas.height - cellheight * screenheight) / 2) : (cellheight = cellwidth * r / t, yoffset = (canvas.height - cellheight * screenheight) / 2, xoffset = (canvas.width - cellwidth * screenwidth) / 2), levelEditorOpened && !textMode && (xoffset += cellwidth, yoffset += cellheight * (1 + editorRowCount)), cellheight |= 0, xoffset |= 0, yoffset |= 0, (oldcellwidth != (cellwidth |= 0) || oldcellheight != cellheight || oldtextmode != textMode || textMode || oldfgcolor != state.fgcolor || forceRegenImages) && (forceRegenImages = !1, regenSpriteImages()), oldcellheight = cellheight, oldcellwidth = cellwidth, oldtextmode = textMode, oldfgcolor = state.fgcolor, redraw()
}
var keyRepeatTimer = 0,
	keyRepeatIndex = 0,
	input_throttle_timer = 0,
	lastinput = -100,
	dragging = !1,
	rightdragging = !1,
	columnAdded = !1;

function selectText(e, n) {
	n = n || window.event;
	var t = document.getElementById(e);
	if (n && (n.ctrlKey || n.metaKey)) {
		var r = ["console"].concat(t.innerText.split("\n")),
			i = levelFromString(state, r);
		loadLevelFromLevelDat(state, i, null), canvasResize()
	} else {
		if (document.selection)(o = document.body.createTextRange()).moveToElementText(t), o.select();
		else if (window.getSelection) {
			var o;
			(o = document.createRange()).selectNode(t);
			var a = window.getSelection();
			a.removeAllRanges(), a.addRange(o)
		}
	}
}

function recalcLevelBounds() {}

function arrCopy(e, n, t, r, i) {
	for (; i--;) t[r++] = e[n]++
}

function adjustLevel(e, n, t) {
	backups.push(backupLevel());
	var r = e.clone();
	e.width += n, e.height += t, e.n_tiles = e.width * e.height, e.objects = new Int32Array(e.n_tiles * STRIDE_OBJ);
	var i = new BitVec(STRIDE_OBJ);
	i.ibitset(state.backgroundid);
	for (var o = 0; o < e.n_tiles; ++o) e.setCell(o, i);
	return e.movements = new Int32Array(e.objects.length), columnAdded = !0, RebuildLevelArrays(), r
}

function addLeftColumn() {
	for (var e = adjustLevel(level, 1, 0), n = 1; n < level.width; ++n)
		for (var t = 0; t < level.height; ++t) {
			var r = n * level.height + t;
			level.setCell(r, e.getCell(r - level.height))
		}
}

function addRightColumn() {
	for (var e = adjustLevel(level, 1, 0), n = 0; n < level.width - 1; ++n)
		for (var t = 0; t < level.height; ++t) {
			var r = n * level.height + t;
			level.setCell(r, e.getCell(r))
		}
}

function addTopRow() {
	for (var e = adjustLevel(level, 0, 1), n = 0; n < level.width; ++n)
		for (var t = 1; t < level.height; ++t) {
			var r = n * level.height + t;
			level.setCell(r, e.getCell(r - n - 1))
		}
}

function addBottomRow() {
	for (var e = adjustLevel(level, 0, 1), n = 0; n < level.width; ++n)
		for (var t = 0; t < level.height - 1; ++t) {
			var r = n * level.height + t;
			level.setCell(r, e.getCell(r - n))
		}
}

function removeLeftColumn() {
	if (!(level.width <= 1))
		for (var e = adjustLevel(level, -1, 0), n = 0; n < level.width; ++n)
			for (var t = 0; t < level.height; ++t) {
				var r = n * level.height + t;
				level.setCell(r, e.getCell(r + level.height))
			}
}

function removeRightColumn() {
	if (!(level.width <= 1))
		for (var e = adjustLevel(level, -1, 0), n = 0; n < level.width; ++n)
			for (var t = 0; t < level.height; ++t) {
				var r = n * level.height + t;
				level.setCell(r, e.getCell(r))
			}
}

function removeTopRow() {
	if (!(level.height <= 1))
		for (var e = adjustLevel(level, 0, -1), n = 0; n < level.width; ++n)
			for (var t = 0; t < level.height; ++t) {
				var r = n * level.height + t;
				level.setCell(r, e.getCell(r + n + 1))
			}
}

function removeBottomRow() {
	if (!(level.height <= 1))
		for (var e = adjustLevel(level, 0, -1), n = 0; n < level.width; ++n)
			for (var t = 0; t < level.height; ++t) {
				var r = n * level.height + t;
				level.setCell(r, e.getCell(r + n))
			}
}

function matchGlyph(e, n) {
	for (var t, r = -1, i = 0; i < n.length; ++i) {
		var o = n[i][0],
			a = n[i][1],
			l = n[i][2];
		if (a.bitsSetInArray(e.data)) {
			for (var s = 0, c = 0; c < 32 * STRIDE_OBJ; ++c) l.get(c) && e.get(c) && s++, a.get(c) && e.get(c) && s++;
			s > r && (r = s, t = o)
		}
	}
	return r > 0 ? t : (logErrorNoLine("Wasn't able to approximate a glyph value for some tiles, using '.' as a placeholder.", !0), ".")
}
var htmlEntityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
		"/": "&#x2F;"
	},
	selectableint = 0;

function printLevel() {
	try {
		errorCount = 0, errorStrings = [];
		var e = [];
		for (var n in state.glyphDict)
			if (state.glyphDict.hasOwnProperty(n) && 1 === n.length) {
				for (var t = state.glyphDict[n], r = new BitVec(STRIDE_OBJ), i = 0; i < t.length; i++) {
					var o = t[i];
					o >= 0 && r.ibitset(o)
				}
				var a = r.clone(),
					l = state.layerMasks[state.backgroundlayer];
				r.iclear(l), e.push([n, r, a])
			} for (var s = "selectable" + ++selectableint, c = 'Printing level contents:<br><br><span id="' + s + '" onclick="selectText(\'' + s + "',event)\">", u = 0; u < level.height; u++) {
			for (i = 0; i < level.width; i++) {
				var d = u + i * level.height;
				(t = matchGlyph(level.getCell(d), e)) in htmlEntityMap && (t = htmlEntityMap[t]), c += t
			}
			u < level.height - 1 && (c += "<br>")
		}
		consolePrint(c += "</span><br><br>", !0)
	} catch (e) {
		consolePrint("unable to print level contents because of errors", !0)
	}
}

function levelEditorClick(e, n) {
	if (mouseCoordY <= -2) {
		var t = mouseCoordX + (screenwidth - 1) * (editorRowCount - (-mouseCoordY - 2) - 1); - 1 === mouseCoordX ? printLevel() : mouseCoordX >= 0 && t < glyphImages.length && (glyphSelectedIndex = t, redraw())
	} else if (mouseCoordX > -1 && mouseCoordY > -1 && mouseCoordX < screenwidth - 2 && mouseCoordY < screenheight - 2 - editorRowCount) {
		for (var r = glyphImagesCorrespondance[glyphSelectedIndex], i = state.glyphDict[r], o = new BitVec(STRIDE_OBJ), a = 0; a < i.length; a++) {
			var l = i[a];
			l >= 0 && o.ibitset(l)
		}
		var s = state.layerMasks[state.backgroundlayer];
		o.bitsClearInArray(s.data) && o.ibitset(state.backgroundid);
		var c = mouseCoordY + mouseCoordX * level.height;
		if (level.getCell(c).equals(o)) return;
		!1 === anyEditsSinceMouseDown && (anyEditsSinceMouseDown = !0, backups.push(backupLevel())), level.setCell(c, o), redraw()
	} else n && (-1 === mouseCoordX ? (addLeftColumn(), canvasResize()) : mouseCoordX === screenwidth - 2 && (addRightColumn(), canvasResize()), -1 === mouseCoordY ? (addTopRow(), canvasResize()) : mouseCoordY === screenheight - 2 - editorRowCount && (addBottomRow(), canvasResize()))
}

function levelEditorRightClick(e, n) {
	if (-2 === mouseCoordY) mouseCoordX <= glyphImages.length && (glyphSelectedIndex = mouseCoordX, redraw());
	else if (mouseCoordX > -1 && mouseCoordY > -1 && mouseCoordX < screenwidth - 2 && mouseCoordY < screenheight - 2 - editorRowCount) {
		var t = mouseCoordY + mouseCoordX * level.height,
			r = new BitVec(STRIDE_OBJ);
		r.ibitset(state.backgroundid), level.setCell(t, r), redraw()
	} else n && (-1 === mouseCoordX ? (removeLeftColumn(), canvasResize()) : mouseCoordX === screenwidth - 2 && (removeRightColumn(), canvasResize()), -1 === mouseCoordY ? (removeTopRow(), canvasResize()) : mouseCoordY === screenheight - 2 - editorRowCount && (removeBottomRow(), canvasResize()))
}
var anyEditsSinceMouseDown = !1;

function onMouseDown(e) {
	if (!e.handled) {
		ULBS();
		var n = 0 === e.button,
			t = 2 === e.button;
		if ("touchstart" == e.type && (n = !0), n && (e.ctrlKey || e.metaKey) && (n = !1, t = !0), n) {
			if (lastDownTarget = e.target, keybuffer = [], (e.target === canvas || "tapFocusIndicator" === e.target.className) && (setMouseCoord(e), dragging = !0, rightdragging = !1, levelEditorOpened)) return anyEditsSinceMouseDown = !1, levelEditorClick(e, !0);
			dragging = !1, rightdragging = !1
		} else if (t && (e.target === canvas || "tapFocusIndicator" === e.target.className) && (setMouseCoord(e), dragging = !1, rightdragging = !0, levelEditorOpened)) return levelEditorRightClick(e, !0);
		e.handled = !0
	}
}

function rightClickCanvas(e) {
	return prevent(e)
}

function onMouseUp(e) {
	e.handled || (dragging = !1, rightdragging = !1, e.handled = !0)
}

function onKeyDown(e) {
	ULBS(), e = e || window.event, !IDE && [32, 37, 38, 39, 40].indexOf(e.keyCode) > -1 && (e && (e.ctrlKey || e.metaKey) || prevent(e)), IDE || 77 !== e.keyCode || toggleMute(), keybuffer.indexOf(e.keyCode) >= 0 || ((lastDownTarget === canvas || window.Mobile && lastDownTarget === window.Mobile.focusIndicator) && -1 === keybuffer.indexOf(e.keyCode) && (e && (e.ctrlKey || e.metaKey) || (keybuffer.splice(keyRepeatIndex, 0, e.keyCode), keyRepeatTimer = 0, checkKey(e, !e.repeat))), !0 === canDump && (74 === e.keyCode && (e.ctrlKey || e.metaKey) ? (dumpTestCase(), prevent(e)) : 75 === e.keyCode && (e.ctrlKey || e.metaKey) ? (makeGIF(), prevent(e)) : 83 === e.keyCode && (e.ctrlKey || e.metaKey) ? (saveClick(), prevent(e)) : 13 === e.keyCode && (e.ctrlKey || e.metaKey) && (canvas.focus(), editor.display.input.blur(), e.shiftKey ? runClick() : rebuildClick(), prevent(e))))
}

function relMouseCoords(e) {
	var n = 0,
		t = 0,
		r = 0,
		i = 0,
		o = this;
	do {
		n += o.offsetLeft - o.scrollLeft, t += o.offsetTop - o.scrollTop
	} while (o = o.offsetParent);
	return null == e.touches ? (r = e.pageX - n, i = e.pageY - t) : (r = e.touches[0].pageX - n, i = e.touches[0].pageY - t), {
		x: r,
		y: i
	}
}

function onKeyUp(e) {
	e = e || window.event;
	var n = keybuffer.indexOf(e.keyCode);
	n >= 0 && (keybuffer.splice(n, 1), keyRepeatIndex >= n && keyRepeatIndex--)
}

function onMyFocus(e) {
	keybuffer = [], keyRepeatIndex = 0, keyRepeatTimer = 0
}

function onMyBlur(e) {
	keybuffer = [], keyRepeatIndex = 0, keyRepeatTimer = 0
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
var mouseCoordX = 0,
	mouseCoordY = 0;

function setMouseCoord(e) {
	var n = canvas.relMouseCoords(e);
	mouseCoordX = n.x - xoffset, mouseCoordY = n.y - yoffset, mouseCoordX = Math.floor(mouseCoordX / cellwidth), mouseCoordY = Math.floor(mouseCoordY / cellheight)
}

function mouseMove(e) {
	e.handled || (levelEditorOpened && (setMouseCoord(e), dragging ? levelEditorClick(e, !1) : rightdragging && levelEditorRightClick(e, !1), redraw()), e.handled = !0)
}

function mouseOut() {}

function prevent(e) {
	return e.preventDefault && e.preventDefault(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.stopPropagation && e.stopPropagation(), e.returnValue = !1, !1
}

function checkKey(e, n) {
	if (ULBS(), !(winning || e && (e.ctrlKey || e.metaKey || e.altKey))) {
		var t = -1;
		switch (e.keyCode) {
			case 65:
			case 37:
				t = 1;
				break;
			case 38:
			case 87:
				t = 0;
				break;
			case 68:
			case 39:
				t = 3;
				break;
			case 83:
			case 40:
				t = 2;
				break;
			case 80:
				printLevel();
				break;
			case 13:
			case 32:
			case 67:
			case 88:
				if (n && ignoreNotJustPressedAction && (ignoreNotJustPressedAction = !1), !1 === n && ignoreNotJustPressedAction) return;
				if (!1 !== norepeat_action && !n) return;
				t = 4;
				break;
			case 85:
			case 90:
				if (!1 === textMode) return pushInput("undo"), DoUndo(!1, !0), canvasResize(), prevent(e);
				break;
			case 82:
				if (!1 === textMode && n) return pushInput("restart"), DoRestart(), canvasResize(), prevent(e);
				break;
			case 27:
				if (!1 === titleScreen) return goToTitleScreen(), tryPlayTitleSound(), canvasResize(), prevent(e);
				break;
			case 69:
				if (canOpenEditor) return n && (titleScreen && ("EMPTY GAME" === state.title ? compile(["loadFirstNonMessageLevel"]) : nextLevel()), !1 === (levelEditorOpened = !levelEditorOpened) && printLevel(), restartTarget = backupLevel(), canvasResize()), prevent(e);
				break;
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
				if (levelEditorOpened && n) {
					var r = 9;
					return e.keyCode >= 49 && (r = e.keyCode - 49), r < glyphImages.length ? glyphSelectedIndex = r : consolePrint("Trying to select tile outside of range in level editor.", !0), canvasResize(), prevent(e)
				}
				break;
			case 189:
			case 109:
				if (levelEditorOpened && n && glyphSelectedIndex > 0) return glyphSelectedIndex--, canvasResize(), prevent(e);
				break;
			case 187:
			case 107:
				if (levelEditorOpened && n && glyphSelectedIndex + 1 < glyphImages.length) return glyphSelectedIndex++, canvasResize(), prevent(e)
		}
		if (throttle_movement && t >= 0 && t <= 3) {
			if (lastinput == t && input_throttle_timer < repeatinterval) return;
			lastinput = t, input_throttle_timer = 0
		}
		if (textMode) {
			if (0 === state.levels.length);
			else if (titleScreen) !1 === quittingTitleScreen && (0 === titleMode ? 4 === t && n && !1 === titleSelected && (tryPlayStartGameSound(), titleSelected = !0, messageselected = !1, timer = 0, quittingTitleScreen = !0, generateTitleScreen(), canvasResize(), clearInputHistory()) : 4 == t && n ? !1 === titleSelected && (tryPlayStartGameSound(), titleSelected = !0, messageselected = !1, timer = 0, quittingTitleScreen = !0, generateTitleScreen(), redraw()) : 0 !== t && 2 !== t || (titleSelection = 0 === t ? 0 : 1, generateTitleScreen(), redraw()));
			else if (4 == t && n) {
				if (unitTesting) return void nextLevel();
				!1 === messageselected && (messageselected = !0, timer = 0, quittingMessageScreen = !0, tryPlayCloseMessageSound(), titleScreen = !1, drawMessageScreen())
			}
		} else if (!againing && t >= 0) return 4 === t && "noaction" in state.metadata || (pushInput(t), processInput(t) && redraw()), prevent(e)
	}
}

function update() {
	if (timer += deltatime, input_throttle_timer += deltatime, quittingTitleScreen && timer / 1e3 > .3 && (quittingTitleScreen = !1, nextLevel()), againing && timer > againinterval && 0 == messagetext.length && processInput(-1) && (redraw(), keyRepeatTimer = 0, autotick = 0), quittingMessageScreen && timer / 1e3 > .15 && (quittingMessageScreen = !1, "" === messagetext ? nextLevel() : (messagetext = "", textMode = !1, titleScreen = !1, titleMode = curlevel > 0 || null !== curlevelTarget ? 1 : 0, titleSelected = !1, ignoreNotJustPressedAction = !0, titleSelection = 0, canvasResize(), checkWin())), winning && timer / 1e3 > .5 && (winning = !1, nextLevel()), keybuffer.length > 0) {
		keyRepeatTimer += deltatime;
		var e = throttle_movement ? repeatinterval : repeatinterval / Math.sqrt(keybuffer.length);
		if (keyRepeatTimer > e) keyRepeatTimer = 0, keyRepeatIndex = (keyRepeatIndex + 1) % keybuffer.length, checkKey({
			keyCode: keybuffer[keyRepeatIndex]
		}, !1)
	}!(autotickinterval > 0) || textMode || levelEditorOpened || againing || winning || (autotick += deltatime) > autotickinterval && (autotick = 0, pushInput("tick"), processInput(-1) && redraw())
}
document.addEventListener("touchstart", onMouseDown, !1), document.addEventListener("touchmove", mouseMove, !1), document.addEventListener("touchend", onMouseUp, !1), document.addEventListener("mousedown", onMouseDown, !1), document.addEventListener("mouseup", onMouseUp, !1), document.addEventListener("keydown", onKeyDown, !1), document.addEventListener("keyup", onKeyUp, !1), window.addEventListener("focus", onMyFocus, !1), window.addEventListener("blur", onMyBlur, !1);
var looping = !1,
	loop = function() {
		looping = !0, update(), "hidden" !== document.visibilityState ? setTimeout(loop, deltatime) : looping = !1
	};

function Animatable(e, n, t) {
	var r;

	function i() {
		var e;
		return (r += n) >= 1 && (e = !0, r = 1), t(r), e
	}

	function o() {
		var e;
		return (r -= n) <= 0 && (e = !0, r = 0), t(r), e
	}
	return r = 0, {
		animateUp: function() {
			Animator.getInstance().animate(e, i)
		},
		animateDown: function() {
			Animator.getInstance().animate(e, o)
		}
	}
}
document.addEventListener("visibilitychange", (function() {
		"visible" === document.visibilityState && !1 === looping && loop()
	})), loop(), window.Mobile = {}, Mobile.hasTouch = function() {
		var e;
		return ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) && (e = !0), e
	}, Mobile.enable = function(e) {
		return (e || Mobile.hasTouch() && !Mobile._instance) && (Mobile._instance = new Mobile.GestureHandler, Mobile._instance.bindEvents(), Mobile._instance.bootstrap()), Mobile._instance
	}, window.Mobile.GestureHandler = function() {
		this.initialize.apply(this, arguments)
	}, Mobile.log = function(e) {
		document.getElementsByTagName("h1")[0].innerHTML = Math.random().toString().substring(4, 1) + "-" + e
	}, Mobile.debugDot = function(e) {
		var n, t;
		t = "border-radius: 50px;width: 5px;height: 5px;background: red;position: absolute;left: " + e.touches[0].clientX + "px;top: " + e.touches[0].clientY + "px;", (n = document.createElement("div")).setAttribute("style", t), document.getElementsByTagName("body")[0].appendChild(n)
	},
	function(e) {
		"use strict";
		var n = {
				action: 88,
				left: 37,
				right: 39,
				up: 38,
				down: 40,
				undo: 85,
				restart: 82,
				quit: 27
			},
			t = ['<div class="tab">', '  <div class="tab-affordance"></div>', '  <div class="tab-icon">', '    <div class="slice"></div>', '    <div class="slice"></div>', "  </div>", "</div>"].join("\n");
		e.initialize = function() {
			this.firstPos = {
				x: 0,
				y: 0
			}, this.setTabAnimationRatio = this.setTabAnimationRatio.bind(this), this.setMenuAnimationRatio = this.setMenuAnimationRatio.bind(this), this.repeatTick = this.repeatTick.bind(this), this.isFocused = !0
		}, e.setFocusElement = function(e) {
			this.focusElement = e, this.isFocused = !1, this.buildFocusIndicator()
		}, e.bindEvents = function() {
			window.addEventListener("touchstart", this.onTouchStart.bind(this)), window.addEventListener("touchend", this.onTouchEnd.bind(this)), window.addEventListener("touchmove", this.onTouchMove.bind(this))
		}, e.bootstrap = function() {
			this.showTab(), this.disableScrolling(), this.isAudioSupported() || this.disableAudio(), this.disableSelection()
		}, e.onTouchStart = function(e) {
			this.isTouching || (this.handleFocusChange(e), this.isFocused && "A" !== e.target.tagName.toUpperCase() && (this.isTouching = !0, this.mayBeSwiping = !0, this.gestured = !1, this.swipeDirection = void 0, this.swipeDistance = 0, this.startTime = (new Date).getTime(), this.firstPos.x = e.touches[0].clientX, this.firstPos.y = e.touches[0].clientY))
		}, e.onTouchEnd = function(e) {
			this.isFocused && this.isTouching && (this.gestured || 0 === e.touches.length && "unMuteButton" !== e.target.id && "muteButton" !== e.target.id && this.handleTap(), 0 === e.touches.length && (this.isTouching = !1, this.endRepeatWatcher()))
		}, e.onTouchMove = function(e) {
			if (this.isFocused && !levelEditorOpened) return this.isSuccessfulSwipe() ? (this.handleSwipe(this.swipeDirection, this.touchCount), this.gestured = !0, this.mayBeSwiping = !1, this.beginRepeatWatcher(e)) : this.mayBeSwiping ? this.swipeStep(e) : this.isRepeating && this.repeatStep(e), prevent(e), !1
		}, e.handleFocusChange = function(e) {
			this.focusElement && (this.isFocused = this.isTouchInsideFocusElement(e), this.setFocusIndicatorVisibility(this.isFocused), canvas.focus(), editor.display.input.blur())
		}, e.isTouchInsideFocusElement = function(e) {
			var n;
			return !(!e.touches || !e.touches[0]) && (n = this.absoluteElementPosition(this.focusElement), !(e.touches[0].clientX < n.left || e.touches[0].clientY < n.top) && !(e.touches[0].clientX > n.left + this.focusElement.clientWidth || e.touches[0].clientY > n.top + this.focusElement.clientHeight))
		}, e.setFocusIndicatorVisibility = function(e) {}, e.absoluteElementPosition = function(e) {
			var n, t;
			for (n = {
					top: e.offsetTop || 0,
					left: e.offsetLeft || 0
				}, t = document.getElementsByTagName("body")[0], n.top -= t.scrollTop || 0; e = e.offsetParent;) n.top += e.offsetTop || 0, n.left += e.offsetLeft || 0;
			return n
		}, e.beginRepeatWatcher = function(e) {
			var n;
			this.repeatInterval || (this.isRepeating = !0, n = 1e3 * state.metadata.key_repeat_interval, !isNaN(n) && n || (n = 150), this.repeatInterval = setInterval(this.repeatTick, n), this.recenter(e))
		}, e.endRepeatWatcher = function() {
			this.repeatInterval && (clearInterval(this.repeatInterval), delete this.repeatInterval, this.isRepeating = !1)
		}, e.repeatTick = function() {
			this.isTouching && this.handleSwipe(this.direction, this.touchCount)
		}, e.recenter = function(e) {
			this.firstPos.x = e.touches[0].clientX, this.firstPos.y = e.touches[0].clientY
		}, e.isSuccessfulSwipe = function() {
			var e;
			return this.mayBeSwiping && void 0 !== this.swipeDirection && this.swipeDistance >= 50 && (e = !0), e
		}, e.swipeStep = function(e) {
			var n, t, r;
			this.mayBeSwiping && (n = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			}, t = (new Date).getTime(), r = e.touches.length, this.swipeDistance = this.cardinalDistance(this.firstPos, n), this.swipeDirection ? t - this.startTime > 1e3 && (this.mayBeSwiping = !1) : this.swipeDistance > 10 && (this.swipeDirection = this.dominantDirection(this.firstPos, n), this.touchCount = r))
		}, e.repeatStep = function(e) {
			var n;
			n = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			}, this.cardinalDistance(this.firstPos, n) >= 50 && (this.swipeDirection = this.dominantDirection(this.firstPos, n), this.recenter(e))
		}, e.cardinalDistance = function(e, n) {
			var t, r;
			return t = Math.abs(e.x - n.x), r = Math.abs(e.y - n.y), Math.max(t, r)
		}, e.dominantDirection = function(e, n) {
			var t, r, i;
			return t = n.x - e.x, r = n.y - e.y, i = "x", Math.abs(r) > Math.abs(t) && (i = "y"), "x" === i ? t > 0 ? "right" : "left" : r > 0 ? "down" : "up"
		}, e.handleSwipe = function(e, n) {
			1 === n ? this.emitKeydown(this.swipeDirection) : n > 1 && this.toggleMenu()
		}, e.handleTap = function() {
			this.emitKeydown("action")
		}, e.emitKeydown = function(e) {
			var t;
			t = {
				keyCode: n[e]
			}, this.fakeCanvasFocus(), onKeyDown(t), onKeyUp(t)
		}, e.fakeCanvasFocus = function() {
			onMouseDown({
				button: 0,
				target: document.getElementById("gameCanvas")
			})
		}, e.toggleMenu = function() {
			this.isMenuVisible ? this.hideMenu() : this.showMenu()
		}, e.showMenu = function() {
			this.menuElem || this.buildMenu(), this.getAnimatables().menu.animateUp(), this.isMenuVisible = !0, this.hideTab()
		}, e.hideMenu = function() {
			this.menuElem && this.getAnimatables().menu.animateDown(), this.isMenuVisible = !1, this.showTab()
		}, e.getAnimatables = function() {
			return this._animatables || (this._animatables = {
				tab: Animatable("tab", .1, this.setTabAnimationRatio),
				menu: Animatable("menu", .1, this.setMenuAnimationRatio)
			}), this._animatables
		}, e.showTab = function() {
			this.tabElem || this.buildTab(), this.getAnimatables().tab.animateDown()
		}, e.hideTab = function() {
			this.tabElem && this.tabElem.setAttribute("style", "display: none;"), this.getAnimatables().tab.animateUp()
		}, e.buildTab = function() {
			var e, n, r, i = this;
			(e = document.createElement("div")).innerHTML = t, r = e.children[0], n = function(e) {
				e.stopPropagation(), i.showMenu()
			}, this.tabAffordance = r.getElementsByClassName("tab-affordance")[0], this.tabElem = r.getElementsByClassName("tab-icon")[0], this.tabAffordance.addEventListener("touchstart", n), this.tabAffordance.addEventListener("click", (e => {})), this.tabElem.addEventListener("touchstart", n), this.tabElem.addEventListener("click", (e => {})), document.getElementsByTagName("body")[0].appendChild(r)
		}, e.buildMenu = function() {
			var e, n, t, r, i, o, a = this;
			(e = document.createElement("div")).innerHTML = this.buildMenuString(state), this.menuElem = e.children[0], this.closeElem = this.menuElem.getElementsByClassName("close")[0], o = function(e) {
				e.stopPropagation(), a.hideMenu()
			}, this.closeAffordance = this.menuElem.getElementsByClassName("close-affordance")[0], i = this.menuElem.getElementsByClassName("close")[0], this.closeAffordance.addEventListener("touchstart", o), this.closeAffordance.addEventListener("click", (e => {})), i.addEventListener("touchstart", o), i.addEventListener("click", (e => {})), (n = this.menuElem.getElementsByClassName("undo")[0]) && (n.addEventListener("touchstart", (function(e) {
				e.stopPropagation(), a.emitKeydown("undo")
			})), n.addEventListener("click", (e => {}))), (t = this.menuElem.getElementsByClassName("restart")[0]) && (t.addEventListener("touchstart", (function(e) {
				e.stopPropagation(), a.emitKeydown("restart")
			})), t.addEventListener("click", (e => {}))), (r = this.menuElem.getElementsByClassName("quit")[0]).addEventListener("touchstart", (function(e) {
				e.stopPropagation(), a.emitKeydown("quit")
			})), r.addEventListener("click", (e => {})), document.getElementsByTagName("body")[0].appendChild(this.menuElem)
		}, e.buildMenuString = function(e) {
			var n, t, r, i;
			return n = 3, (r = e.metadata.noundo) && (n -= 1), (i = e.metadata.norestart) && (n -= 1), t = ['<div class="mobile-menu item-count-' + n + '">', '  <div class="close-affordance"></div>', '  <div class="close">', '    <div class="slice"></div>', '    <div class="slice"></div>', "  </div>"], r || t.push('  <div class="undo button">Undo</div>'), i || t.push('  <div class="restart button">Restart</div>'), (t = t.concat(['  <div class="quit button">Quit to Menu</div>', '  <div class="clear"></div>', "</div>"])).join("\n")
		}, e.buildFocusIndicator = function() {
			this.focusIndicator = document.createElement("DIV"), this.focusIndicator.setAttribute("class", "tapFocusIndicator"), this.focusIndicator.setAttribute("style", "visibility: hidden;"), this.focusElement.parentNode.appendChild(this.focusIndicator)
		}, e.setTabAnimationRatio = function(e) {
			var n;
			(e = Math.round(1e3 * e) / 1e3) >= .999 ? this.tabAffordance.setAttribute("style", "display: none;") : this.tabAffordance.setAttribute("style", "display: block;"), n = "opacity: " + (1 - e) + ";" + " width: " + (66 * e + 18 * (1 - e)) + "px;", this.tabElem.setAttribute("style", n)
		}, e.setMenuAnimationRatio = function(e) {
			var n, t, r;
			r = "left: " + ((n = -18 * (e = Math.round(1e3 * e) / 1e3) + -66 * (1 - e)) - 4) + "px; " + (t = "opacity: " + e + ";") + " width: " + -n + "px;", (e = Math.round(1e3 * e) / 1e3) <= .001 ? (this.closeAffordance.setAttribute("style", "display: none;"), t = "display:none;") : this.closeAffordance.setAttribute("style", "display: block;"), this.closeElem.setAttribute("style", r), this.menuElem.setAttribute("style", t)
		}, e.disableScrolling = function() {
			var e = {
					height: "100%",
					overflow: "hidden",
					position: "fixed",
					width: "100%"
				},
				n = "";
			for (var t in e) n += t + ": " + e[t] + "; ";
			document.body.setAttribute("style", n)
		}, e.disableAudio = function() {
			window.playSeed = function() {}
		}, e.isAudioSupported = function() {
			var e = !0;
			return "undefined" != typeof webkitAudioContext && (e = !1), e
		}, e.disableSelection = function() {
			var e;
			(e = document.getElementsByTagName("body")[0]).setAttribute("class", e.getAttribute("class") + " disable-select")
		}
	}(window.Mobile.GestureHandler.prototype), window.Animator = function() {
		this.initialize.apply(this, arguments)
	},
	function(e) {
		e.initialize = function() {
			this._animations = {}, this.tick = this.tick.bind(this)
		}, e.animate = function(e, n) {
			this._animations[e] = n, this.wakeup()
		}, e.wakeup = function() {
			this._isAnimating || (this._isAnimating = !0, this.tick())
		}, e.tick = function() {
			var e, n, t;
			for (e in t = [], n = !0, this._animations) {
				if (!this._animations.hasOwnProperty(e)) return;
				this._animations[e]() ? t.push(e) : n = !1
			}
			if (n) {
				for (0; 0 < t.length; t++) delete this._isAnimating[t[0]];
				this._isAnimating = !1
			} else requestAnimationFrame(this.tick)
		}
	}(window.Animator.prototype), window.Animator.getInstance = function() {
		return window.Animator._instance || (window.Animator._instance = new window.Animator), window.Animator._instance
	},
	function() {
		"use strict";
		var e, n, t = ["ms", "moz", "webkit", "o"];
		for (e = 0; e < t.length && !window.requestAnimationFrame; e++) window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[e] + "CancelAnimationFrame"], window.cancelAnimationFrame || (window.cancelAnimationFrame = window[t[e] + "CancelRequestAnimationFrame"]);
		window.requestAnimationFrame || (n = 0, window.requestAnimationFrame = function(e, t) {
			var r, i, o;
			return r = (new Date).getTime(), i = Math.max(0, 16 - (r - n)), o = window.setTimeout((function() {
				e(r + i)
			}), i), n = r + i, o
		}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
			clearTimeout(e)
		}), Mobile.enable()
	}();
var get_blob = function() {
		return self.Blob
	},
	standalone_HTML_String = "",
	clientStandaloneRequest = new XMLHttpRequest;

function escapeHtmlChars(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

function buildStandalone(e) { if (0 !== standalone_HTML_String.length) { var n = standalone_HTML_String.concat(""), t = "PuzzleScript Game"; void 0 !== state.metadata.title && (t = state.metadata.title); var r = "https://brainy7890.netlify.app"; void 0 !== state.metadata.homepage && ((r = state.metadata.homepage).match(/^https?:\/\//) || (r = "https://" + r)); var i = r.replace(/^https?:\/\//, ""); i = escapeHtmlChars(i); var o = "black"; "background_color" in state.metadata && (o = state.bgcolor), n = n.replace(/___BGCOLOR___/g, o); var a = "lightblue"; "text_color" in state.metadata && (a = state.fgcolor), n = (n = (n = (n = n.replace(/___TEXTCOLOR___/g, a)).replace(/__GAMETITLE__/g, escapeHtmlChars(t))).replace(/__HOMEPAGE__/g, r)).replace(/__HOMEPAGE_STRIPPED_PROTOCOL__/g, i), e = e.replace(/\$/g, "$$$$"), n = n.replace(/"__GAMEDAT__"/g, e);var musicUrl = document.getElementById('musicInput').value.trim(); if (musicUrl) {var musicScript = `<script> let music = new Audio('${musicUrl}'); music.loop = true; music.play(); </script>`; n = n.replace("</body>", musicScript + "</body>"); }
		var l = new(get_blob())([n], {
			type: "text/plain;charset=utf-8"
		});
		saveAs(l, t + ".html")
	} else consolePrint("Can't export yet - still downloading html template.", !0, null, null)
}
clientStandaloneRequest.open("GET", "standalone_inlined.txt"), clientStandaloneRequest.onreadystatechange = function() {
	4 == clientStandaloneRequest.readyState && ("" === clientStandaloneRequest.responseText && consolePrint("Couldn't find standalone template. Is there a connection problem to the internet?", !0, null, null), standalone_HTML_String = clientStandaloneRequest.responseText)
}, clientStandaloneRequest.send();
var RandomGen = new RNG,
	intro_template = ["..................................", "..................................", "..................................", "......Puzzle Script Terminal......", "..............v 1.7...............", "..................................", "..................................", "..................................", ".........insert cartridge.........", "..................................", "..................................", "..................................", ".................................."],
	messagecontainer_template = ["..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..........X to continue...........", "..................................", ".................................."],
	titletemplate_firstgo = ["..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..........#.start game.#..........", "..................................", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
	titletemplate_select0 = ["..................................", "..................................", "..................................", "..................................", "..................................", "...........#.new game.#...........", "..................................", ".............continue.............", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
	titletemplate_select1 = ["..................................", "..................................", "..................................", "..................................", "..................................", ".............new game.............", "..................................", "...........#.continue.#...........", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
	titletemplate_firstgo_selected = ["..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "###########.start game.###########", "..................................", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
	titletemplate_select0_selected = ["..................................", "..................................", "..................................", "..................................", "..................................", "############.new game.############", "..................................", ".............continue.............", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", ".................................."],
	titletemplate_select1_selected = ["..................................", "..................................", "..................................", "..................................", "..................................", ".............new game.............", "..................................", "############.continue.############", "..................................", ".arrow keys to move...............", ".X to action......................", ".Z to undo, R to restart..........", "................................."],
	titleImage = [],
	titleWidth = titletemplate_select1[0].length,
	titleHeight = titletemplate_select1.length,
	textMode = !0,
	titleScreen = !0,
	titleMode = 0,
	titleSelection = 0,
	titleSelected = !1;

function showContinueOptionOnTitleScreen() {
	return (curlevel > 0 || null !== curlevelTarget) && curlevel in state.levels
}

function unloadGame() {
	state = introstate, (level = new Level(0, 5, 5, 2, null)).objects = new Int32Array(0), generateTitleScreen(), canvasResize(), redraw()
}

function generateTitleScreen() {
	if (titleMode = showContinueOptionOnTitleScreen() ? 1 : 0, 0 !== state.levels.length) {
		var e = "PuzzleScript Game";
		void 0 !== state.metadata.title && (e = state.metadata.title), titleImage = deepClone(0 === titleMode ? titleSelected ? titletemplate_firstgo_selected : titletemplate_firstgo : 0 === titleSelection ? titleSelected ? titletemplate_select0_selected : titletemplate_select0 : titleSelected ? titletemplate_select1_selected : titletemplate_select1);
		var n = "noaction" in state.metadata,
			t = "noundo" in state.metadata,
			r = "norestart" in state.metadata;
		t && r ? titleImage[11] = ".............................................." : t ? titleImage[11] = ".......R to restart..........................." : r && (titleImage[11] = ".Z to undo....................."), n && (titleImage[10] = ".......X to select............................");
		for (var i = 0; i < titleImage.length; i++) titleImage[i] = titleImage[i].replace(/\./g, " ");
		var o = titleImage[0].length,
			a = wordwrap(e, titleImage[0].length);
		void 0 !== state.metadata.author ? a.length > 3 && (a.splice(3), logWarning("Game title is too long to fit on screen, truncating to three lines.", state.metadata_lines.title, !0)) : a.length > 5 && (a.splice(5), logWarning("Game title is too long to fit on screen, truncating to five lines.", state.metadata_lines.title, !0));
		for (i = 0; i < a.length; i++) {
			var l = a[i],
				s = l.length,
				c = (o - s) / 2 | 0,
				u = titleImage[1 + i];
			titleImage[1 + i] = u.slice(0, c) + l + u.slice(c + l.length)
		}
		if (void 0 !== state.metadata.author) {
			var d = wordwrap("by " + state.metadata.author, titleImage[0].length);
			d[0].length < titleImage[0].length && (d[0] = " " + d[0]), d.length > 3 && (d.splice(3), logWarning("Author list too long to fit on screen, truncating to three lines.", state.metadata_lines.author, !0));
			for (i = 0; i < d.length; i++) {
				var h = d[i] + " ";
				h.length > o && (h = h.slice(0, o));
				u = titleImage[3 + i];
				titleImage[3 + i] = u.slice(0, o - h.length) + h
			}
		}
	} else titleImage = intro_template
}
var introstate = {
		title: "EMPTY GAME",
		attribution: "increpare",
		objectCount: 2,
		metadata: [],
		levels: [],
		bgcolor: "#000000",
		fgcolor: "#FFFFFF"
	},
	state = introstate;

function deepClone(e) {
	if (!e) return e;
	if ([Number, String, Boolean].forEach((function(t) {
			e instanceof t && (n = t(e))
		})), void 0 === n)
		if ("[object Array]" === Object.prototype.toString.call(e)) n = [], e.forEach((function(e, t, r) {
			n[t] = deepClone(e)
		}));
		else if ("object" == typeof e)
		if (e.nodeType && "function" == typeof e.cloneNode) var n = e.cloneNode(!0);
		else if (e.prototype) n = e;
	else if (e instanceof Date) n = new Date(e);
	else
		for (var t in n = {}, e) n[t] = deepClone(e[t]);
	else n = e;
	return n
}

function wordwrap(e, n) {
	if (!e) return e;
	var t = ".{1," + (n = n || 75) + "}(\\s|$)|.{" + n + "}|.+$";
	return e.match(RegExp(t, "g"))
}
var splitMessage = [];

function drawMessageScreen() {
	titleMode = 0, textMode = !0, titleImage = deepClone(messagecontainer_template);
	for (var e = 0; e < titleImage.length; e++) titleImage[e] = titleImage[e].replace(/\./g, " ");
	var n = titleImage[9],
		t = titleImage[10];
	titleImage[10] = n;
	var r, i = titleImage[0].length;
	"" === messagetext ? r = state.levels[curlevel].message.trim() : r = messagetext;
	var o = 5 - ((splitMessage = wordwrap(r, titleImage[0].length)).length / 2 | 0);
	o < 0 && (o = 0);
	var a = Math.min(splitMessage.length, 12);
	for (e = 0; e < a; e++) {
		var l = splitMessage[e],
			s = o + e,
			c = l.length,
			u = (i - c) / 2 | 0,
			d = titleImage[s];
		titleImage[s] = d.slice(0, u) + l + d.slice(u + l.length)
	}
	var h = 10;
	a >= 10 && (h = a < 12 ? a + 1 : 12), titleImage[h] = quittingMessageScreen ? n : t, canvasResize()
}
var loadedLevelSeed = 0;

function loadLevelFromLevelDat(e, n, t, r) {
	if (null == t && (t = (Math.random() + Date.now()).toString()), RandomGen = new RNG(loadedLevelSeed = t), forceRegenImages = !0, ignoreNotJustPressedAction = !0, titleScreen = !1, titleMode = showContinueOptionOnTitleScreen() ? 1 : 0, titleSelection = showContinueOptionOnTitleScreen() ? 1 : 0, titleSelected = !1, againing = !1, void 0 === n) return consolePrint("Trying to access a level that doesn't exist.", !0), void goToTitleScreen();
	void 0 === n.message ? (titleMode = 0, textMode = !1, level = n.clone(), RebuildLevelArrays(), void 0 !== e && (void 0 !== e.metadata.flickscreen ? oldflickscreendat = [0, 0, Math.min(e.metadata.flickscreen[0], level.width), Math.min(e.metadata.flickscreen[1], level.height)] : void 0 !== e.metadata.zoomscreen && (oldflickscreendat = [0, 0, Math.min(e.metadata.zoomscreen[0], level.width), Math.min(e.metadata.zoomscreen[1], level.height)])), backups = [], restartTarget = backupLevel(), keybuffer = [], "run_rules_on_level_start" in e.metadata && (runrulesonlevelstart_phase = !0, processInput(-1, !0), runrulesonlevelstart_phase = !1)) : (ignoreNotJustPressedAction = !0, tryPlayShowMessageSound(), drawMessageScreen(), canvasResize()), !0 === r && clearInputHistory()
}

function loadLevelFromStateTarget(e, n, t, r) {
	curlevel = n, curlevelTarget = t, void 0 === t.message && tryPlayStartLevelSound(), loadLevelFromLevelDat(e, e.levels[n], r), restoreLevel(t), restartTarget = t
}

function loadLevelFromState(e, n, t) {
	var r = e.levels[n];
	curlevel = n, curlevelTarget = null, void 0 !== r && void 0 === r.message && tryPlayStartLevelSound(), loadLevelFromLevelDat(e, r, t)
}
var sprites = [{
	color: "#423563",
	dat: [
		[1, 1, 1, 1, 1],
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
		[1, 1, 1, 1, 1]
	]
}, {
	color: "#252342",
	dat: [
		[0, 0, 1, 0, 0],
		[1, 1, 1, 1, 1],
		[0, 0, 1, 0, 0],
		[0, 1, 1, 1, 0],
		[0, 1, 0, 1, 0]
	]
}];

function tryPlaySimpleSound(e) {
	void 0 !== state.sfx_Events[e] && playSound(state.sfx_Events[e], !0)
}

function tryPlayTitleSound() {
	tryPlaySimpleSound("titlescreen")
}

function tryPlayStartGameSound() {
	tryPlaySimpleSound("startgame")
}

function tryPlayEndGameSound() {
	tryPlaySimpleSound("endgame")
}

function tryPlayCancelSound() {
	tryPlaySimpleSound("cancel")
}

function tryPlayStartLevelSound() {
	tryPlaySimpleSound("startlevel")
}

function tryPlayEndLevelSound() {
	tryPlaySimpleSound("endlevel")
}

function tryPlayUndoSound() {
	tryPlaySimpleSound("undo")
}

function tryPlayRestartSound() {
	tryPlaySimpleSound("restart")
}

function tryPlayShowMessageSound() {
	tryPlaySimpleSound("showmessage")
}

function tryPlayCloseMessageSound() {
	tryPlaySimpleSound("closemessage")
}
generateTitleScreen(), titleMode > 0 && (titleSelection = 1), canvasResize();
var restartTarget, backups = [];

function backupLevel() {
	return {
		dat: new Int32Array(level.objects),
		width: level.width,
		height: level.height,
		oldflickscreendat: oldflickscreendat.concat([])
	}
}

function level4Serialization() {
	return {
		dat: Array.from(level.objects),
		width: level.width,
		height: level.height,
		oldflickscreendat: oldflickscreendat.concat([])
	}
}

function setGameState(e, n, t) {
	for (var r in oldflickscreendat = [], timer = 0, autotick = 0, winning = !1, againing = !1, messageselected = !1, STRIDE_MOV = e.STRIDE_MOV, STRIDE_OBJ = e.STRIDE_OBJ, sfxCreateMask = new BitVec(STRIDE_OBJ), sfxDestroyMask = new BitVec(STRIDE_OBJ), void 0 === n && (n = ["restart"]), (0 === state.levels.length || 0 === e.levels.length) && n.length > 0 && "rebuild" === n[0] && (n = ["restart"]), void 0 === t && (t = null), RandomGen = new RNG(t), state = e, "rebuild" !== n[0] && (backups = []), sprites = [], state.objects)
		if (state.objects.hasOwnProperty(r)) {
			var i = state.objects[r],
				o = {
					colors: i.colors,
					dat: i.spritematrix
				};
			sprites[i.id] = o
		} switch (void 0 !== state.metadata.realtime_interval ? (autotick = 0, autotickinterval = 1e3 * state.metadata.realtime_interval) : (autotick = 0, autotickinterval = 0), repeatinterval = void 0 !== state.metadata.key_repeat_interval ? 1e3 * state.metadata.key_repeat_interval : 150, againinterval = void 0 !== state.metadata.again_interval ? 1e3 * state.metadata.again_interval : 150, throttle_movement && 0 === autotickinterval && logWarning("throttle_movement is designed for use in conjunction with realtime_interval. Using it in other situations makes games gross and unresponsive, broadly speaking.  Please don't."), norepeat_action = void 0 !== state.metadata.norepeat_action, n[0]) {
		case "restart":
			winning = !1, timer = 0, titleScreen = !0, tryPlayTitleSound(), textMode = !0, titleSelection = showContinueOptionOnTitleScreen() ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, showContinueOptionOnTitleScreen() && (titleMode = 1), generateTitleScreen();
			break;
		case "rebuild":
			break;
		case "loadFirstNonMessageLevel":
			for (var a = 0; a < state.levels.length; a++)
				if (!state.levels[a].hasOwnProperty("message")) {
					curlevel = l = a, curlevelTarget = null, winning = !1, timer = 0, titleScreen = !1, textMode = !1, titleSelection = showContinueOptionOnTitleScreen() ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, loadLevelFromState(state, l, t);
					break
				} break;
		case "loadLevel":
			var l = n[1];
			curlevel = l, curlevelTarget = null, winning = !1, timer = 0, titleScreen = !1, textMode = !1, titleSelection = showContinueOptionOnTitleScreen() ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, loadLevelFromState(state, l, t);
			break;
		case "levelline":
			var s = n[1];
			for (a = state.levels.length - 1; a >= 0; a--) {
				if (state.levels[a].lineNumber <= s + 1) {
					curlevel = a, curlevelTarget = null, winning = !1, timer = 0, titleScreen = !1, textMode = !1, titleSelection = showContinueOptionOnTitleScreen() ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, loadLevelFromState(state, a);
					break
				}
			}
	}
	"rebuild" !== n[0] && clearInputHistory(), canvasResize(), 0 == state.sounds.length ? killAudioButton() : showAudioButton()
}

function RebuildLevelArrays() {
	level.movements = new Int32Array(level.n_tiles * STRIDE_MOV), level.rigidMovementAppliedMask = [], level.rigidGroupIndexMask = [], level.rowCellContents = [], level.rowCellContents_Movements = [], level.colCellContents = [], level.colCellContents_Movements = [], level.mapCellContents = new BitVec(STRIDE_OBJ), level.mapCellContents_Movements = new BitVec(STRIDE_MOV), _movementVecs = [new BitVec(STRIDE_MOV), new BitVec(STRIDE_MOV), new BitVec(STRIDE_MOV)], _rigidVecs = [new BitVec(STRIDE_MOV), new BitVec(STRIDE_MOV), new BitVec(STRIDE_MOV)], _o1 = new BitVec(STRIDE_OBJ), _o2 = new BitVec(STRIDE_OBJ), _o2_5 = new BitVec(STRIDE_OBJ), _o3 = new BitVec(STRIDE_OBJ), _o4 = new BitVec(STRIDE_OBJ), _o5 = new BitVec(STRIDE_OBJ), _o6 = new BitVec(STRIDE_OBJ), _o7 = new BitVec(STRIDE_OBJ), _o8 = new BitVec(STRIDE_OBJ), _o9 = new BitVec(STRIDE_OBJ), _o10 = new BitVec(STRIDE_OBJ), _o11 = new BitVec(STRIDE_OBJ), _o12 = new BitVec(STRIDE_OBJ), _m1 = new BitVec(STRIDE_MOV), _m2 = new BitVec(STRIDE_MOV), _m3 = new BitVec(STRIDE_MOV);
	for (var e = 0; e < level.height; e++) level.rowCellContents[e] = new BitVec(STRIDE_OBJ);
	for (e = 0; e < level.width; e++) level.colCellContents[e] = new BitVec(STRIDE_OBJ);
	for (e = 0; e < level.height; e++) level.rowCellContents_Movements[e] = new BitVec(STRIDE_MOV);
	for (e = 0; e < level.width; e++) level.colCellContents_Movements[e] = new BitVec(STRIDE_MOV);
	for (e = 0; e < level.n_tiles; e++) level.rigidMovementAppliedMask[e] = new BitVec(STRIDE_MOV), level.rigidGroupIndexMask[e] = new BitVec(STRIDE_MOV)
}
var messagetext = "";

function applyDiff(e, n) {
	for (var t = 0; t < e.dat.length;) {
		var r = e.dat[t],
			i = e.dat[t + 1];
		if (0 === i) break;
		for (var o = 0; o < i; o++) n[r + o] = e.dat[t + 2 + o];
		t += 2 + i
	}
}

function unconsolidateDiff(e, n) {
	if (!e.hasOwnProperty("diff")) return e;
	var t = new Int32Array(n.dat);
	return applyDiff(e, t), {
		dat: t,
		width: e.width,
		height: e.height,
		oldflickscreendat: e.oldflickscreendat
	}
}

function restoreLevel(e) {
	var n = e.hasOwnProperty("diff");
	if (oldflickscreendat = e.oldflickscreendat.concat([]), n ? applyDiff(e, level.objects) : level.objects = new Int32Array(e.dat), level.width !== e.width || level.height !== e.height) level.width = e.width, level.height = e.height, level.n_tiles = e.width * e.height, RebuildLevelArrays();
	else {
		for (var t = 0; t < level.n_tiles; t++) level.movements[t] = 0, level.rigidMovementAppliedMask[t].setZero(), level.rigidGroupIndexMask[t].setZero();
		for (t = 0; t < level.height; t++) {
			level.rowCellContents[t].setZero()
		}
		for (t = 0; t < level.width; t++) {
			level.colCellContents[t].setZero()
		}
	}
	againing = !1, level.commandQueue = [], level.commandQueueSourceRules = []
}
var zoomscreen = !1,
	flickscreen = !1,
	screenwidth = 0,
	screenheight = 0;

function consolidateDiff(e, n) {
	if (e.width !== n.width || e.height !== n.height || e.dat.length !== n.dat.length) return e;
	if (e.hasOwnProperty("diff") || n.hasOwnProperty("diff")) return e;
	if (e.dat.length < 1024) return e;
	for (var t = new Int32Array(128), r = 0, i = !1, o = -1, a = e.dat, l = n.dat, s = 0; s < a.length; s++)
		if (!1 === i) {
			if (a[s] !== l[s]) {
				if (i = !0, o = r, t.length < r + 4)(c = new Int32Array(2 * t.length)).set(t), t = c;
				t[r + 0] = s, t[r + 1] = 1, t[r + 2] = a[s], r += 3
			}
		} else if (a[s] !== l[s]) {
		var c;
		if (r + 1 >= t.length)
			if (t.length < r + 4)(c = new Int32Array(2 * t.length)).set(t), t = c;
		t[o + 1]++, t[r] = a[s], r++
	} else i = !1;
	return {
		diff: !0,
		dat: t,
		width: e.width,
		height: e.height,
		oldflickscreendat: e.oldflickscreendat
	}
}

function addUndoState(e) {
	backups.push(e), backups.length > 2 && !backups[backups.length - 1].hasOwnProperty("diff") && (backups[backups.length - 3] = consolidateDiff(backups[backups.length - 3], backups[backups.length - 2]))
}

function DoRestart(e) {
	!0 !== restarting && (!0 !== e && "norestart" in state.metadata || (restarting = !0, !0 !== e && addUndoState(backupLevel()), verbose_logging && consolePrint("--- restarting ---", !0), restoreLevel(restartTarget), tryPlayRestartSound(), "run_rules_on_level_start" in state.metadata && processInput(-1, !0), level.commandQueue = [], level.commandQueueSourceRules = [], restarting = !1))
}

function backupDiffers() {
	if (0 == backups.length) return !0;
	var e = backups[backups.length - 1];
	if (e.hasOwnProperty("diff")) return 0 !== e.dat.length && 0 !== e.dat[1];
	for (var n = 0; n < level.objects.length; n++)
		if (level.objects[n] !== e.dat[n]) return !0;
	return !1
}

function DoUndo(e, n) {
	if (levelEditorOpened || !("noundo" in state.metadata) || !0 === e) {
		if (verbose_logging && consolePrint("--- undoing ---", !0), n)
			for (; 0 == backupDiffers();) backups.pop();
		if (backups.length > 0) restoreLevel(backups[backups.length - 1]), backups = backups.splice(0, backups.length - 1), e || tryPlayUndoSound()
	}
}

function getPlayerPositions() {
	for (var e = [], n = state.playerMask, t = 0; t < level.n_tiles; t++) level.getCellInto(t, _o11), n.anyBitsInCommon(_o11) && e.push(t);
	return e
}

function getLayersOfMask(e) {
	for (var n = [], t = 0; t < state.objectCount; t++)
		if (e.get(t)) {
			var r = state.idDict[t],
				i = state.objects[r];
			n.push(i.layer)
		} return n
}

function moveEntitiesAtIndex(e, n, t) {
	var r = level.getCell(e);
	r.iand(n);
	for (var i = getLayersOfMask(r), o = level.getMovements(e), a = 0; a < i.length; a++) o.ishiftor(t, 5 * i[a]);
	level.setMovements(e, o);
	var l = e / level.height | 0,
		s = e % level.height;
	level.colCellContents_Movements[l].ior(o), level.rowCellContents_Movements[s].ior(o), level.mapCellContents_Movements.ior(o)
}

function startMovement(e) {
	for (var n = getPlayerPositions(), t = 0; t < n.length; t++) {
		moveEntitiesAtIndex(n[t], state.playerMask, e)
	}
	return n
}
var _movementVecs, dirMasksDelta = {
		1: [0, -1],
		2: [0, 1],
		4: [-1, 0],
		8: [1, 0],
		15: [0, 0],
		16: [0, 0],
		3: [0, 0]
	},
	dirMaskName = {
		1: "up",
		2: "down",
		4: "left",
		8: "right",
		15: "?",
		16: "action",
		3: "no"
	},
	seedsToPlay_CanMove = [],
	seedsToPlay_CantMove = [];

function repositionEntitiesOnLayer(e, n, t) {
	var r = dirMasksDelta[t],
		i = r[0],
		o = r[1],
		a = e / level.height | 0,
		l = e % level.height,
		s = level.width - 1,
		c = level.height - 1;
	if (0 === a && i < 0 || a === s && i > 0 || 0 === l && o < 0 || l === c && o > 0) return !1;
	var u = e + r[1] + r[0] * level.height,
		d = state.layerMasks[n],
		h = level.getCellInto(u, _o7),
		f = level.getCellInto(e, _o8);
	if (d.anyBitsInCommon(h) && 16 != t) return !1;
	for (var p = 0; p < state.sfx_MovementMasks[n].length; p++) {
		var g = state.sfx_MovementMasks[n][p];
		if (g.objectMask.anyBitsInCommon(f)) {
			var m = level.getMovements(e),
				v = g.directionMask;
			m.anyBitsInCommon(v) && -1 === seedsToPlay_CanMove.indexOf(g.seed) && seedsToPlay_CanMove.push(g.seed)
		}
	}
	var y = f.clone();
	f.iclear(d), y.iand(d), h.ior(y), level.setCell(e, f), level.setCell(u, h);
	var b = u / level.height | 0,
		w = u % level.height;
	return level.colCellContents[b].ior(y), level.rowCellContents[w].ior(y), !0
}

function repositionEntitiesAtCell(e) {
	var n = level.getMovements(e);
	if (n.iszero()) return !1;
	for (var t = !1, r = 0; r < level.layerCount; r++) {
		var i = n.getshiftor(31, 5 * r);
		if (0 !== i) repositionEntitiesOnLayer(e, r, i) && (n.ishiftclear(i, 5 * r), t = !0)
	}
	return level.setMovements(e, n), t
}

function Level(e, n, t, r, i) {
	this.lineNumber = e, this.width = n, this.height = t, this.n_tiles = n * t, this.objects = i, this.layerCount = r, this.commandQueue = [], this.commandQueueSourceRules = []
}
Level.prototype.delta_index = function(e) {
	const [n, t] = dirMasksDelta[e];
	return n * this.height + t
}, Level.prototype.clone = function() {
	var e = new Level(this.lineNumber, this.width, this.height, this.layerCount, null);
	return e.objects = new Int32Array(this.objects), e
}, Level.prototype.getCell = function(e) {
	return new BitVec(this.objects.subarray(e * STRIDE_OBJ, e * STRIDE_OBJ + STRIDE_OBJ))
}, Level.prototype.getCellInto = function(e, n) {
	for (var t = 0; t < STRIDE_OBJ; t++) n.data[t] = this.objects[e * STRIDE_OBJ + t];
	return n
}, Level.prototype.setCell = function(e, n) {
	for (var t = 0; t < n.data.length; ++t) this.objects[e * STRIDE_OBJ + t] = n.data[t]
};
var _movementVecIndex = 0;
Level.prototype.getMovements = function(e) {
	var n = _movementVecs[_movementVecIndex];
	_movementVecIndex = (_movementVecIndex + 1) % _movementVecs.length;
	for (var t = 0; t < STRIDE_MOV; t++) n.data[t] = this.movements[e * STRIDE_MOV + t];
	return n
}, Level.prototype.getRigids = function(e) {
	return this.rigidMovementAppliedMask[e].clone()
}, Level.prototype.getMovementsInto = function(e, n) {
	for (var t = n, r = 0; r < STRIDE_MOV; r++) t.data[r] = this.movements[e * STRIDE_MOV + r];
	return t
}, Level.prototype.setMovements = function(e, n) {
	for (var t = 0; t < n.data.length; ++t) this.movements[e * STRIDE_MOV + t] = n.data[t];
	var r = e / this.height | 0,
		i = e % this.height;
	level.colCellContents_Movements[r].ior(n), level.rowCellContents_Movements[i].ior(n), level.mapCellContents_Movements.ior(n)
};
var ellipsisPattern = ["ellipsis"];

function BitVec(e) {
	return this.data = new Int32Array(e), this
}

function Rule(e) {
	this.direction = e[0], this.patterns = e[1], this.hasReplacements = e[2], this.lineNumber = e[3], this.ellipsisCount = e[4], this.groupNumber = e[5], this.isRigid = e[6], this.commands = e[7], this.isRandom = e[8], this.cellRowMasks = e[9], this.cellRowMasks_Movements = e[10], this.ruleMask = this.cellRowMasks.reduce(((e, n) => (e.ior(n), e)), new BitVec(STRIDE_OBJ)), this.cellRowMatches = [];
	for (var n = 0; n < this.patterns.length; n++) this.cellRowMatches.push(this.generateCellRowMatchesFunction(this.patterns[n], this.ellipsisCount[n]))
}
BitVec.prototype.cloneInto = function(e) {
	for (var n = 0; n < this.data.length; ++n) e.data[n] = this.data[n];
	return e
}, BitVec.prototype.clone = function() {
	return new BitVec(this.data)
}, BitVec.prototype.iand = function(e) {
	for (var n = 0; n < this.data.length; ++n) this.data[n] &= e.data[n]
}, BitVec.prototype.inot = function() {
	for (var e = 0; e < this.data.length; ++e) this.data[e] = ~this.data[e]
}, BitVec.prototype.ior = function(e) {
	for (var n = 0; n < this.data.length; ++n) this.data[n] |= e.data[n]
}, BitVec.prototype.iclear = function(e) {
	for (var n = 0; n < this.data.length; ++n) this.data[n] &= ~e.data[n]
}, BitVec.prototype.ibitset = function(e) {
	this.data[e >> 5] |= 1 << (31 & e)
}, BitVec.prototype.ibitclear = function(e) {
	this.data[e >> 5] &= ~(1 << (31 & e))
}, BitVec.prototype.get = function(e) {
	return 0 != (this.data[e >> 5] & 1 << (31 & e))
}, BitVec.prototype.getshiftor = function(e, n) {
	var t = 31 & n,
		r = this.data[n >> 5] >>> t;
	return t && (r |= this.data[1 + (n >> 5)] << 32 - t), r & e
}, BitVec.prototype.ishiftor = function(e, n) {
	var t = 31 & n,
		r = e << t;
	if (this.data[n >> 5] |= r, t) {
		var i = e >> 32 - t;
		this.data[1 + (n >> 5)] |= i
	}
}, BitVec.prototype.ishiftclear = function(e, n) {
	var t = 31 & n,
		r = e << t;
	if (this.data[n >> 5] &= ~r, t) {
		var i = e >> 32 - (31 & n);
		this.data[1 + (n >> 5)] &= ~i
	}
}, BitVec.prototype.equals = function(e) {
	if (this.data.length !== e.data.length) return !1;
	for (var n = 0; n < this.data.length; ++n)
		if (this.data[n] !== e.data[n]) return !1;
	return !0
}, BitVec.prototype.setZero = function() {
	for (var e = 0; e < this.data.length; ++e) this.data[e] = 0
}, BitVec.prototype.iszero = function() {
	for (var e = 0; e < this.data.length; ++e)
		if (this.data[e]) return !1;
	return !0
}, BitVec.prototype.bitsSetInArray = function(e) {
	for (var n = 0; n < this.data.length; ++n)
		if ((this.data[n] & e[n]) !== this.data[n]) return !1;
	return !0
}, BitVec.prototype.bitsClearInArray = function(e) {
	for (var n = 0; n < this.data.length; ++n)
		if (this.data[n] & e[n]) return !1;
	return !0
}, BitVec.prototype.anyBitsInCommon = function(e) {
	return !this.bitsClearInArray(e.data)
}, Rule.prototype.generateCellRowMatchesFunction = function(e, n) {
	if (0 === n) {
		for (var t = e.length, r = "", i = 1 === STRIDE_OBJ ? "" : "*" + STRIDE_OBJ, o = 0; o < STRIDE_OBJ; ++o) r += "var cellObjects" + o + " = objects[i" + i + (o ? "+" + o : "") + "];\n";
		i = 1 === STRIDE_MOV ? "" : "*" + STRIDE_MOV;
		for (o = 0; o < STRIDE_MOV; ++o) r += "var cellMovements" + o + " = movements[i" + i + (o ? "+" + o : "") + "];\n";
		r += "return " + e[0].generateMatchString("0_");
		for (var a = 1; a < t; a++) r += "&&cellRow[" + a + "].matches(i+" + a + "*d, objects, movements)";
		return (r += ";") in matchCache ? matchCache[r] : matchCache[r] = new Function("cellRow", "i", "d", "objects", "movements", r)
	}
	if (1 === n) {
		t = e.length, r = "var result = [];\n";
		r += "if(cellRow[0].matches(i, objects, movements)";
		for (a = 1; e[a] !== ellipsisPattern; a++) r += "&&cellRow[" + a + "].matches(i+" + a + "*d, objects, movements)";
		for (r += ") {\n", r += "\tfor (var k=kmin;k<kmax;k++) {\n", r += "\t\tif(cellRow[" + ++a + "].matches((i+d*(k+" + (a - 1) + ")), objects, movements)", a++; a < t; a++) r += "&&cellRow[" + a + "].matches((i+d*(k+" + (a - 1) + ")), objects, movements)";
		return r += "){\n", r += "\t\t\tresult.push([i,k]);\n", r += "\t\t}\n", r += "\t}\n", r += "}\n", (r += "return result;") in matchCache ? matchCache[r] : matchCache[r] = new Function("cellRow", "i", "kmax", "kmin", "d", "objects", "movements", r)
	}
	t = e.length;
	var l = -1,
		s = -1;
	for (a = 0; a < t; a++)
		if (e[a] === ellipsisPattern) {
			if (-1 !== l) {
				s = a;
				break
			}
			l = a
		} r = "var result = [];\n";
	r += "if(cellRow[0].matches(i, objects, movements)";
	for (var c = 1; c < l; c++) r += "&&cellRow[" + c + "].matches(i+" + c + "*d, objects, movements)";
	r += ") {\n", r += "\tfor (var k1=k1min;k1<k1max;k1++) {\n", r += "\t\tif(cellRow[" + (l + 1) + "].matches((i+d*(k1+" + (l + 1 - 1) + ")), objects, movements)";
	for (c = l + 2; c < s; c++) r += "&&cellRow[" + c + "].matches((i+d*(k1+" + (c - 1) + ")), objects, movements)";
	r += "\t\t){\n", r += "\t\t\tfor (var k2=k2min;k1+k2<kmax && k2<k2max;k2++) {\n", r += "\t\t\t\tif(cellRow[" + (s + 1) + "].matches((i+d*(k1+k2+" + (s + 1 - 2) + ")), objects, movements)";
	for (c = s + 2; c < t; c++) r += "&&cellRow[" + c + "].matches((i+d*(k1+k2+" + (c - 2) + ")), objects, movements)";
	return r += "\t\t\t\t){\n", r += "\t\t\t\t\tresult.push([i,k1,k2]);\n", r += "\t\t\t\t}\n", r += "\t\t\t}\n", r += "\t\t}\n", r += "\t}\n", r += "}\n", (r += "return result;") in matchCache ? matchCache[r] : matchCache[r] = new Function("cellRow", "i", "kmax", "kmin", "k1max", "k1min", "k2max", "k2min", "d", "objects", "movements", r)
};
var STRIDE_OBJ = 1,
	STRIDE_MOV = 1;

function CellPattern(e) {
	this.objectsPresent = e[0], this.objectsMissing = e[1], this.anyObjectsPresent = e[2], this.movementsPresent = e[3], this.movementsMissing = e[4], this.matches = this.generateMatchFunction(), this.replacement = e[5]
}

function CellReplacement(e) {
	this.objectsClear = e[0], this.objectsSet = e[1], this.movementsClear = e[2], this.movementsSet = e[3], this.movementsLayerMask = e[4], this.randomEntityMask = e[5], this.randomDirMask = e[6]
}
var _o1, _o2, _o2_5, _o3, _o4, _o5, _o6, _o7, _o8, _o9, _o10, _o11, _o12, _m1, _m2, _m3, matchCache = {};

function matchCellRow(e, n, t, r, i, o) {
	var a = [];
	if (!r.bitsSetInArray(level.mapCellContents.data) || !i.bitsSetInArray(level.mapCellContents_Movements.data)) return a;
	var l = 0,
		s = level.width,
		c = 0,
		u = level.height,
		d = t.length;
	switch (e) {
		case 1:
			c += d - 1;
			break;
		case 2:
			u -= d - 1;
			break;
		case 4:
			l += d - 1;
			break;
		case 8:
			s -= d - 1;
			break;
		default:
			window.console.log("EEEP " + e)
	}
	if (e > 2) {
		for (var h = c; h < u; h++)
			if (r.bitsSetInArray(level.rowCellContents[h].data) && i.bitsSetInArray(level.rowCellContents_Movements[h].data))
				for (var f = l; f < s; f++) {
					n(t, p = f * level.height + h, o, level.objects, level.movements) && a.push(p)
				}
	} else
		for (f = l; f < s; f++)
			if (r.bitsSetInArray(level.colCellContents[f].data) && i.bitsSetInArray(level.colCellContents_Movements[f].data))
				for (h = c; h < u; h++) {
					var p;
					n(t, p = f * level.height + h, o, level.objects, level.movements) && a.push(p)
				}
	return a
}

function matchCellRowWildCard(e, n, t, r, i, o, a) {
	var l = [];
	if (!r.bitsSetInArray(level.mapCellContents.data) || !i.bitsSetInArray(level.mapCellContents_Movements.data)) return l;
	var s = 0,
		c = level.width,
		u = 0,
		d = level.height,
		h = t.length - a;
	switch (e) {
		case 1:
			u += h - 1;
			break;
		case 2:
			d -= h - 1;
			break;
		case 4:
			s += h - 1;
			break;
		case 8:
			c -= h - 1;
			break;
		default:
			window.console.log("EEEP2 " + e)
	}
	if (e > 2) {
		for (var f = u; f < d; f++)
			if (r.bitsSetInArray(level.rowCellContents[f].data) && i.bitsSetInArray(level.rowCellContents_Movements[f].data))
				for (var p = s; p < c; p++) {
					var g = p * level.height + f;
					4 === e ? m = p - h + 2 : 8 === e ? m = level.width - (p + h) + 1 : window.console.log("EEEP2 " + e), 1 === a ? l.push.apply(l, n(t, g, m, 0, o, level.objects, level.movements)) : l.push.apply(l, n(t, g, m, 0, m, 0, m, 0, o, level.objects, level.movements))
				}
	} else
		for (p = s; p < c; p++)
			if (r.bitsSetInArray(level.colCellContents[p].data) && i.bitsSetInArray(level.colCellContents_Movements[p].data))
				for (f = u; f < d; f++) {
					var m;
					g = p * level.height + f;
					2 === e ? m = level.height - (f + h) + 1 : 1 === e ? m = f - h + 2 : window.console.log("EEEP2 " + e), 1 === a ? l.push.apply(l, n(t, g, m, 0, o, level.objects, level.movements)) : l.push.apply(l, n(t, g, m, 0, m, 0, m, 0, o, level.objects, level.movements))
				}
	return l
}

function generateTuples(e) {
	for (var n = [
			[]
		], t = 0; t < e.length; t++) {
		for (var r = e[t], i = [], o = 0; o < r.length; o++)
			for (var a = r[o], l = 0; l < n.length; l++) {
				var s = n[l].concat([a]);
				i.push(s)
			}
		n = i
	}
	return n
}

function showTempMessage() {
	keybuffer = [], textMode = !0, titleScreen = !1, quittingMessageScreen = !1, messageselected = !1, ignoreNotJustPressedAction = !0, tryPlayShowMessageSound(), drawMessageScreen(), canvasResize()
}

function processOutputCommands(e) {
	for (var n = 0; n < e.length; n++) {
		var t = e[n];
		"f" === t.charAt(1) && tryPlaySimpleSound(t), !1 === unitTesting && "message" === t && showTempMessage()
	}
}

function applyRandomRuleGroup(e, n) {
	for (var t = [], r = 0; r < n.length; r++) {
		var i = (c = n[r]).findMatches();
		if (i.length > 0)
			for (var o = generateTuples(i), a = 0; a < o.length; a++) {
				var l = o[a];
				t.push([r, l])
			}
	}
	if (0 === t.length) return !1;
	var s = t[Math.floor(RandomGen.uniform() * t.length)],
		c = n[r = s[0]];
	l = s[1];
	const u = e.delta_index(c.direction);
	var d = c.applyAt(e, l, !1, u);
	return c.queueCommands(), d
}

function applyRuleGroup(e) {
	if (e[0].isRandom) return applyRandomRuleGroup(level, e);
	for (var n = !1, t = !0, r = 0, i = -1; t;) {
		if (++r > 200) {
			logErrorCacheable("Got caught looping lots in a rule group :O", e[0].lineNumber, !0);
			break
		}
		t = !1;
		for (var o = 0; o < e.length; o++) {
			if (e[o].tryApply(level) ? (t = !0, i = 0) : i++, i === e.length) break
		}
		t && (n = !0, verbose_logging && (debugger_turnIndex++, addToDebugTimeline(level, -2)))
	}
	return n
}

function applyRules(e, n, t, r) {
	for (var i = t > 0, o = 0, a = t; a < e.length;) {
		if (r && r[a]);
		else i = applyRuleGroup(e[a]) || i;
		if (i && void 0 !== n[a]) {
			if (a = n[a], i = !1, ++o > 200) {
				logErrorCacheable("got caught in an endless startloop...endloop vortex, escaping!", e[a][0].lineNumber, !0);
				break
			}
			verbose_logging && (debugger_turnIndex++, addToDebugTimeline(level, -2))
		} else {
			if (++a === e.length && i && void 0 !== n[a] && (a = n[a], i = !1, ++o > 200)) {
				logErrorCacheable("got caught in an endless startloop...endloop vortex, escaping!", e[a][0].lineNumber, !0);
				break
			}
			verbose_logging && (debugger_turnIndex++, addToDebugTimeline(level, -2))
		}
	}
}

function resolveMovements(e, n) {
	for (var t = !0; t;) {
		t = !1;
		for (var r = 0; r < e.n_tiles; r++) t = repositionEntitiesAtCell(r) || t
	}
	var i = !1;
	for (r = 0; r < e.n_tiles; r++) {
		var o = e.getCellInto(r, _o6),
			a = e.getMovements(r);
		if (!a.iszero()) {
			var l = e.rigidMovementAppliedMask[r];
			if (!l.iszero() && (a.iand(l), !a.iszero()))
				for (var s = 0; s < e.layerCount; s++) {
					if (0 !== a.getshiftor(31, 5 * s)) {
						var c = e.rigidGroupIndexMask[r].getshiftor(31, 5 * s);
						c--;
						var u = state.rigidGroupIndex_to_GroupIndex[c];
						!0 !== n[u] && (n[u] = !0, i = !0);
						break
					}
				}
			for (s = 0; s < state.sfx_MovementFailureMasks.length; s++) {
				var d = state.sfx_MovementFailureMasks[s];
				if (d.objectMask.anyBitsInCommon(o)) {
					var h = d.directionMask;
					a.anyBitsInCommon(h) && -1 === seedsToPlay_CantMove.indexOf(d.seed) && seedsToPlay_CantMove.push(d.seed)
				}
			}
		}
		for (s = 0; s < STRIDE_MOV; s++) e.movements[s + r * STRIDE_MOV] = 0;
		e.rigidGroupIndexMask[r].setZero(), e.rigidMovementAppliedMask[r].setZero()
	}
	return i
}
CellPattern.prototype.generateMatchString = function() {
	for (var e = "(true", n = 0; n < Math.max(STRIDE_OBJ, STRIDE_MOV); ++n) {
		var t = "cellObjects" + n,
			r = "cellMovements" + n,
			i = this.objectsPresent.data[n],
			o = this.objectsMissing.data[n],
			a = this.movementsPresent.data[n],
			l = this.movementsMissing.data[n];
		i && (e += i & i - 1 ? "\t\t&& ((" + t + "&" + i + ")===" + i + ")\n" : "\t\t&& (" + t + "&" + i + ")\n"), o && (e += "\t\t&& !(" + t + "&" + o + ")\n"), a && (e += a & a - 1 ? "\t\t&& ((" + r + "&" + a + ")===" + a + ")\n" : "\t\t&& (" + r + "&" + a + ")\n"), l && (e += "\t\t&& !(" + r + "&" + l + ")\n")
	}
	for (var s = 0; s < this.anyObjectsPresent.length; s++) {
		e += "\t\t&& (0";
		for (n = 0; n < STRIDE_OBJ; ++n) {
			var c = this.anyObjectsPresent[s].data[n];
			c && (e += "|(cellObjects" + n + "&" + c + ")")
		}
		e += ")"
	}
	return e += "\t)"
}, CellPattern.prototype.generateMatchFunction = function() {
	for (var e = "", n = 1 === STRIDE_OBJ ? "" : "*" + STRIDE_OBJ, t = 0; t < STRIDE_OBJ; ++t) e += "\tvar cellObjects" + t + " = objects[i" + n + (t ? "+" + t : "") + "];\n";
	n = 1 === STRIDE_MOV ? "" : "*" + STRIDE_MOV;
	for (t = 0; t < STRIDE_MOV; ++t) e += "\tvar cellMovements" + t + " = movements[i" + n + (t ? "+" + t : "") + "];\n";
	return (e += "return " + this.generateMatchString() + ";") in matchCache ? matchCache[e] : matchCache[e] = new Function("i", "objects", "movements", e)
}, CellPattern.prototype.replace = function(e, n) {
	var t = this.replacement;
	if (null === t) return !1;
	var r = t.randomEntityMask,
		i = t.randomDirMask,
		o = t.objectsSet.cloneInto(_o1),
		a = t.objectsClear.cloneInto(_o2),
		l = t.movementsSet.cloneInto(_m1),
		s = t.movementsClear.cloneInto(_m2);
	if (s.ior(t.movementsLayerMask), !r.iszero()) {
		for (var c = [], u = 0; u < 32 * STRIDE_OBJ; u++) r.get(u) && c.push(u);
		var d = c[Math.floor(RandomGen.uniform() * c.length)],
			h = state.idDict[d],
			f = state.objects[h];
		o.ibitset(d), a.ior(state.layerMasks[f.layer]), s.ishiftor(31, 5 * f.layer)
	}
	if (!i.iszero())
		for (var p = 0; p < level.layerCount; p++)
			if (i.get(5 * p)) {
				var g = Math.floor(4 * RandomGen.uniform());
				l.ibitset(g + 5 * p)
			} var m = level.getCellInto(n, _o2_5),
		v = level.getMovements(n),
		y = m.cloneInto(_o3),
		b = v.cloneInto(_m3);
	m.iclear(a), m.ior(o), v.iclear(s), v.ior(l);
	var w = !1,
		_ = 0,
		C = 0;
	if (e.isRigid) {
		var k = state.groupNumber_to_RigidGroupIndex[e.groupNumber];
		k++;
		for (var x = new BitVec(STRIDE_MOV), S = 0; S < level.layerCount; S++) x.ishiftor(k, 5 * S);
		x.iand(t.movementsLayerMask), _ = level.rigidGroupIndexMask[n] || new BitVec(STRIDE_MOV), C = level.rigidMovementAppliedMask[n] || new BitVec(STRIDE_MOV), x.bitsSetInArray(_.data) || t.movementsLayerMask.bitsSetInArray(C.data) || (_.ior(x), C.ior(t.movementsLayerMask), w = !0)
	}
	var M = !1;
	if (!y.equals(m) || !b.equals(v) || w) {
		M = !0, w && (level.rigidGroupIndexMask[n] = _, level.rigidMovementAppliedMask[n] = C);
		var E = m.cloneInto(_o4);
		E.iclear(y), sfxCreateMask.ior(E);
		var R = y.cloneInto(_o5);
		R.iclear(m), sfxDestroyMask.ior(R), level.setCell(n, m), level.setMovements(n, v);
		var T = n / level.height | 0,
			L = n % level.height;
		level.colCellContents[T].ior(m), level.rowCellContents[L].ior(m), level.mapCellContents.ior(m)
	}
	return M
}, Rule.prototype.findMatches = function() {
	if (!this.ruleMask.bitsSetInArray(level.mapCellContents.data)) return [];
	const e = level.delta_index(this.direction);
	for (var n = [], t = this.cellRowMasks, r = this.cellRowMasks_Movements, i = 0; i < this.patterns.length; i++) {
		var o = this.patterns[i],
			a = this.cellRowMatches[i];
		if (1 === this.ellipsisCount[i]) var l = matchCellRowWildCard(this.direction, a, o, t[i], r[i], e, this.ellipsisCount[i]);
		else if (0 === this.ellipsisCount[i]) l = matchCellRow(this.direction, a, o, t[i], r[i], e);
		else l = matchCellRowWildCard(this.direction, a, o, t[i], r[i], e, this.ellipsisCount[i]);
		if (0 === l.length) return [];
		n.push(l)
	}
	return n
}, Rule.prototype.directional = function() {
	for (var e = 0; e < state.rules.length; e++)
		for (var n = state.rules[e], t = 0, r = 0; r < n.length; r++)
			if (this.lineNumber === n[r].lineNumber && t++, t > 1) return !0;
	return !1
}, Rule.prototype.applyAt = function(e, n, t, r) {
	var i = this;
	if (t)
		for (var o = 0; o < this.patterns.length; o++)
			if (1 === this.ellipsisCount[o]) {
				if (0 == this.cellRowMatches[o](this.patterns[o], n[o][0], n[o][1] + 1, n[o][1], r, e.objects, e.movements).length) return !1
			} else if (2 === this.ellipsisCount[o]) {
		if (0 == this.cellRowMatches[o](this.patterns[o], n[o][0], n[o][1] + n[o][2] + 1, n[o][1] + n[o][2], n[o][1] + 1, n[o][1], n[o][2] + 1, n[o][2], r, e.objects, e.movements).length) return !1
	} else if (!this.cellRowMatches[o](this.patterns[o], n[o], r, e.objects, e.movements)) return !1;
	var a = !1;
	for (o = 0; o < i.patterns.length; o++)
		for (var l = i.patterns[o], s = 0, c = i.ellipsisCount[o] > 0 ? n[o][0] : n[o], u = 0; u < l.length; u++) {
			var d = l[u];
			if (d !== ellipsisPattern) a = d.replace(i, c) || a, c += r;
			else {
				var h = n[o][1 + s];
				s++, !0, c += r * h
			}
		}
	if (verbose_logging && a) {
		var f = dirMaskName[i.direction];
		i.directional() || (f = "");
		var p = addToDebugTimeline(e, i.lineNumber);
		consolePrint(`<font color="green">Rule <a onclick="jumpToLine(${i.lineNumber});"  href="javascript:void(0);">${i.lineNumber}</a> ${f} applied.</font>`, !1, i.lineNumber, p)
	}
	return a
}, Rule.prototype.tryApply = function(e) {
	const n = e.delta_index(this.direction);
	var t = this.findMatches();
	if (0 === t.length) return !1;
	var r = !1;
	if (this.hasReplacements)
		for (var i = generateTuples(t), o = 0; o < i.length; o++) {
			var a = i[o],
				l = o > 0;
			r = this.applyAt(e, a, l, n) || r
		}
	return t.length > 0 && this.queueCommands(), r
}, Rule.prototype.queueCommands = function() {
	var e = this.commands;
	if (0 != e.length) {
		for (var n = level.commandQueue.indexOf("cancel") >= 0, t = level.commandQueue.indexOf("restart") >= 0, r = !1, i = !1, o = 0; o < e.length; o++) {
			var a = e[o][0];
			"cancel" === a ? r = !0 : "restart" === a && (i = !0)
		}
		if (!n && (!t || r)) {
			(r || i) && (level.commandQueue = [], level.commandQueueSourceRules = [], messagetext = "");
			for (o = 0; o < e.length; o++) {
				var l = e[o];
				if (!(level.commandQueue.indexOf(l[0]) >= 0)) {
					if (level.commandQueue.push(l[0]), level.commandQueueSourceRules.push(this), verbose_logging) {
						var s = this.lineNumber;
						dirMaskName[this.direction];
						consolePrint('<font color="green">Rule <a onclick="jumpToLine(' + s.toString() + ');"  href="javascript:void(0);">' + s.toString() + "</a> triggers command " + l[0] + ".</font>", !1, s, null)
					}
					"message" === l[0] && (messagetext = l[1])
				}
			}
		}
	}
};
var sfxCreateMask = null,
	sfxDestroyMask = null;

function calculateRowColMasks() {
	for (var e = 0; e < level.mapCellContents.data.length; e++) level.mapCellContents.data[e] = 0, level.mapCellContents_Movements.data[e] = 0;
	for (e = 0; e < level.width; e++) {
		level.colCellContents[e].setZero(), level.colCellContents_Movements[e].setZero()
	}
	for (e = 0; e < level.height; e++) {
		level.rowCellContents[e].setZero(), level.rowCellContents_Movements[e].setZero()
	}
	for (e = 0; e < level.width; e++)
		for (var n = 0; n < level.height; n++) {
			var t = n + e * level.height,
				r = level.getCellInto(t, _o9);
			level.mapCellContents.ior(r), level.rowCellContents[n].ior(r), level.colCellContents[e].ior(r);
			var i = level.getMovementsInto(t, _m1);
			level.mapCellContents_Movements.ior(i), level.rowCellContents_Movements[n].ior(i), level.colCellContents_Movements[e].ior(i)
		}
}

function processInput(e, n, t) {
	againing = !1;
	var r = backupLevel(),
		i = e,
		o = [];
	if (e <= 4) {
		if (verbose_logging && (debugger_turnIndex++, addToDebugTimeline(level, -2)), e >= 0) {
			switch (e) {
				case 0:
					e = parseInt("00001", 2);
					break;
				case 1:
					e = parseInt("00100", 2);
					break;
				case 2:
					e = parseInt("00010", 2);
					break;
				case 3:
					e = parseInt("01000", 2);
					break;
				case 4:
					e = parseInt("10000", 2)
			}
			o = startMovement(e)
		}
		if (verbose_logging) {
			consolePrint("Applying rules");
			var a = addToDebugTimeline(level, -1);
			consolePrint(-1 === e ? "Turn starts with no input." : `Turn starts with input of ${["up","left","down","right","action"][i]}.`, !1, null, a)
		}
		var l = [];
		level.commandQueue = [], level.commandQueueSourceRules = [];
		var s = 0,
			c = !1;
		const E = {
			objects: new Int32Array(level.objects),
			movements: new Int32Array(level.movements),
			rigidGroupIndexMask: level.rigidGroupIndexMask.concat([]),
			rigidMovementAppliedMask: level.rigidMovementAppliedMask.concat([]),
			commandQueue: [],
			commandQueueSourceRules: []
		};
		sfxCreateMask.setZero(), sfxDestroyMask.setZero(), seedsToPlay_CanMove = [], seedsToPlay_CantMove = [], calculateRowColMasks();
		var u = [],
			d = 0;
		do {
			if (c = !1, d++, applyRules(state.rules, state.loopPoint, s, l), resolveMovements(level, l)) {
				if (c = !0, IDE) {
					var h = [];
					for (var f in l) u.includes(f) || (h.push(f), u.push(f));
					var p = h.map((e => state.rules[e][0].lineNumber)),
						g = p.length > 1 ? "lines " : "line ";
					consolePrint(`Rigid movement application failed in rule-Group starting from ${g+=p.map((e=>`<a onclick="jumpToLine(${e});" href="javascript:void(0);">${e}</a>`)).join(", ")}, and will be disabled in resimulation. Rolling back...`)
				}
				level.objects = new Int32Array(E.objects), level.movements = new Int32Array(E.movements), level.rigidGroupIndexMask = E.rigidGroupIndexMask.concat([]), level.rigidMovementAppliedMask = E.rigidMovementAppliedMask.concat([]), level.commandQueue = E.commandQueue.concat([]), level.commandQueueSourceRules = E.commandQueueSourceRules.concat([]), sfxCreateMask.setZero(), sfxDestroyMask.setZero(), verbose_logging && c && d > 0 && (consolePrint("Relooping through rules because of rigid."), debugger_turnIndex++, addToDebugTimeline(level, -2)), s = 0
			} else {
				if (verbose_logging) {
					var m = debug_visualisation_array[debugger_turnIndex].length + 1;
					consolePrint("Processed movements.", !1, null, a = addToDebugTimeline(level, m)), state.lateRules.length > 0 && (debugger_turnIndex++, addToDebugTimeline(level, -2), consolePrint("Applying late rules"))
				}
				applyRules(state.lateRules, state.lateLoopPoint, 0), s = 0
			}
		} while (d < 50 && c);
		if (d >= 50 && consolePrint("Looped through 50 times, gave up.  too many loops!"), o.length > 0 && void 0 !== state.metadata.require_player_movement) {
			var v = !1;
			for (d = 0; d < o.length; d++) {
				var y = o[d],
					b = level.getCell(y);
				if (state.playerMask.bitsClearInArray(b.data)) {
					v = !0;
					break
				}
			}
			if (!1 === v) return verbose_logging && (consolePrint("require_player_movement set, but no player movement detected, so cancelling turn."), consoleCacheDump()), addUndoState(r), DoUndo(!0, !1), !1
		}
		if (level.commandQueue.indexOf("cancel") >= 0) {
			if (verbose_logging) consoleCacheDump(), consolePrintFromRule("CANCEL command executed, cancelling turn.", x = level.commandQueueSourceRules[level.commandQueue.indexOf("cancel")], !0);
			t || processOutputCommands(level.commandQueue);
			var w = level.commandQueue.length > 1;
			return addUndoState(r), DoUndo(!0, !1), tryPlayCancelSound(), w
		}
		if (level.commandQueue.indexOf("restart") >= 0) {
			if (verbose_logging && runrulesonlevelstart_phase) logWarning('A "restart" command is being triggered in the "run_rules_on_level_start" section of level creation, which would cause an infinite loop if it was actually triggered, but it\'s being ignored, so it\'s not.', (x = level.commandQueueSourceRules[level.commandQueue.indexOf("restart")]).lineNumber, !0);
			if (verbose_logging) consolePrintFromRule("RESTART command executed, reverting to restart state.", (x = level.commandQueueSourceRules[level.commandQueue.indexOf("restart")]).lineNumber), consoleCacheDump();
			return t || processOutputCommands(level.commandQueue), addUndoState(r), t || DoRestart(!0), !0
		}
		var _ = !1;
		for (d = 0; d < level.objects.length; d++)
			if (level.objects[d] !== r.dat[d]) {
				if (t) return verbose_logging && consoleCacheDump(), addUndoState(r), DoUndo(!0, !1), !0; - 1 !== e ? addUndoState(r) : backups.length > 0 && (backups[backups.length - 1] = unconsolidateDiff(backups[backups.length - 1], r)), _ = !0;
				break
			} if (t && level.commandQueue.indexOf("win") >= 0) return !0;
		if (t) return verbose_logging && consoleCacheDump(), !1;
		for (d = 0; d < seedsToPlay_CantMove.length; d++) playSound(seedsToPlay_CantMove[d]);
		for (d = 0; d < seedsToPlay_CanMove.length; d++) playSound(seedsToPlay_CanMove[d]);
		for (d = 0; d < state.sfx_CreationMasks.length; d++) {
			var C = state.sfx_CreationMasks[d];
			sfxCreateMask.anyBitsInCommon(C.objectMask) && playSound(C.seed)
		}
		for (d = 0; d < state.sfx_DestructionMasks.length; d++) {
			C = state.sfx_DestructionMasks[d];
			sfxDestroyMask.anyBitsInCommon(C.objectMask) && playSound(C.seed)
		}
		if (t || processOutputCommands(level.commandQueue), !1 === textMode && (verbose_logging && consolePrint("Checking win conditions."), void 0 === n && (n = !1), checkWin(n)), !winning) {
			if (level.commandQueue.indexOf("checkpoint") >= 0) {
				if (verbose_logging) consolePrintFromRule("CHECKPOINT command executed, saving current state to the restart state.", x = level.commandQueueSourceRules[level.commandQueue.indexOf("checkpoint")]);
				restartTarget = level4Serialization(), hasUsedCheckpoint = !0;
				var k = JSON.stringify(restartTarget);
				storage_set(document.URL + "_checkpoint", k), storage_set(document.URL, curlevel)
			}
			if (level.commandQueue.indexOf("again") >= 0 && _) {
				var x = level.commandQueueSourceRules[level.commandQueue.indexOf("again")],
					S = verbose_logging,
					M = messagetext;
				verbose_logging = !1, processInput(-1, !0, !0) ? ((verbose_logging = S) && consolePrintFromRule("AGAIN command executed, with changes detected - will execute another turn.", x), againing = !0, timer = 0) : (verbose_logging = S) && consolePrintFromRule("AGAIN command not executed, it wouldn't make any changes.", x), verbose_logging = S, messagetext = M
			}
		}
		verbose_logging && consolePrint("Turn complete"), level.commandQueue = [], level.commandQueueSourceRules = []
	}
	return verbose_logging && consoleCacheDump(), winning && (againing = !1), _
}

function checkWin(e) {
	if (levelEditorOpened && (e = !0), level.commandQueue.indexOf("win") >= 0) return consolePrint(runrulesonlevelstart_phase ? "Win Condition Satisfied (However this is in the run_rules_on_level_start rule pass, so I'm going to ignore it for you.  Why would you want to complete a level before it's already started?!)" : "Win Condition Satisfied"), void(e || DoWin());
	var n = !1;
	if (state.winconditions.length > 0) {
		for (var t = !0, r = 0; r < state.winconditions.length; r++) {
			var i = state.winconditions[r],
				o = i[1],
				a = i[2],
				l = !0;
			const e = i[4] ? e => o.bitsSetInArray(e) : e => !o.bitsClearInArray(e),
				n = i[5] ? e => a.bitsSetInArray(e) : e => !a.bitsClearInArray(e);
			switch (i[0]) {
				case -1:
					for (var s = 0; s < level.n_tiles; s++) {
						if (e((u = level.getCellInto(s, _o10)).data) && n(u.data)) {
							l = !1;
							break
						}
					}
					break;
				case 0:
					var c = !1;
					for (s = 0; s < level.n_tiles; s++) {
						if (e((u = level.getCellInto(s, _o10)).data) && n(u.data)) {
							c = !0;
							break
						}
					}!1 === c && (l = !1);
					break;
				case 1:
					for (s = 0; s < level.n_tiles; s++) {
						var u;
						if (e((u = level.getCellInto(s, _o10)).data) && !n(u.data)) {
							l = !1;
							break
						}
					}
			}!1 === l && (t = !1)
		}
		n = t
	}
	n && (consolePrint(runrulesonlevelstart_phase ? "Win Condition Satisfied (However this is in the run_rules_on_level_start rule pass, so I'm going to ignore it for you.  Why would you want to complete a level before it's already started?!)" : "Win Condition Satisfied"), e || DoWin())
}

function DoWin() {
	winning || (againing = !1, tryPlayEndLevelSound(), unitTesting ? nextLevel() : (winning = !0, timer = 0))
}

function nextLevel() {
	if (againing = !1, messagetext = "", state && state.levels && curlevel > state.levels.length && (curlevel = state.levels.length - 1), ignoreNotJustPressedAction = !0, titleScreen) 0 === titleSelection && (curlevel = 0, curlevelTarget = null), null !== curlevelTarget ? loadLevelFromStateTarget(state, curlevel, curlevelTarget) : loadLevelFromState(state, curlevel);
	else if (hasUsedCheckpoint && (curlevelTarget = null, hasUsedCheckpoint = !1), curlevel < state.levels.length - 1) curlevel++, textMode = !1, titleScreen = !1, quittingMessageScreen = !1, messageselected = !1, null !== (curlevelTarget = null) ? loadLevelFromStateTarget(state, curlevel, curlevelTarget) : loadLevelFromState(state, curlevel);
	else {
		try {
			storage_remove(document.URL), storage_remove(document.URL + "_checkpoint")
		} catch (e) {}
		curlevel = 0, curlevelTarget = null, goToTitleScreen(), tryPlayEndGameSound()
	}
	try {
		if (storage_set(document.URL, curlevel), null !== curlevelTarget) {
			restartTarget = level4Serialization();
			var e = JSON.stringify(restartTarget);
			storage_set(document.URL + "_checkpoint", e)
		} else storage_remove(document.URL + "_checkpoint")
	} catch (e) {}
	void 0 !== state && void 0 !== state.metadata.flickscreen && (oldflickscreendat = [0, 0, Math.min(state.metadata.flickscreen[0], level.width), Math.min(state.metadata.flickscreen[1], level.height)]), canvasResize()
}

function goToTitleScreen() {
	againing = !1, messagetext = "", titleScreen = !0, textMode = !0, doSetupTitleScreenLevelContinue(), titleSelection = showContinueOptionOnTitleScreen() ? 1 : 0, generateTitleScreen(), null !== canvas && regenSpriteImages()
}
const MAX_ERRORS_FOR_REAL = 100;
var compiling = !1,
	errorStrings = [],
	errorCount = 0;

function TooManyErrors() {
	const e = compiling ? "Too many errors/warnings; aborting compilation." : "Too many errors/warnings; noping out.";
	throw consolePrint(e, !0), new Error(e)
}

function logErrorCacheable(e, n, t) {
	if (compiling || t) {
		if (void 0 === n) return logErrorNoLine(e, t);
		var r = '<a onclick="jumpToLine(' + n.toString() + ');"  href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + n.toString() + '</span></a> : <span class="errorText">' + e + "</span>";
		errorStrings.indexOf(r) >= 0 && !t || (consolePrint(r), errorStrings.push(r), errorCount++, errorStrings.length > MAX_ERRORS_FOR_REAL && TooManyErrors())
	}
}

function logError(e, n, t) {
	if (compiling || t) {
		if (void 0 === n) return logErrorNoLine(e, t);
		var r = '<a onclick="jumpToLine(' + n.toString() + ');"  href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + n.toString() + '</span></a> : <span class="errorText">' + e + "</span>";
		errorStrings.indexOf(r) >= 0 && !t || (consolePrint(r, !0), errorStrings.push(r), errorCount++, errorStrings.length > MAX_ERRORS_FOR_REAL && TooManyErrors())
	}
}

function logWarning(e, n, t) {
	if (compiling || t) {
		if (void 0 === n) return logWarningNoLine(e, t);
		var r = '<a onclick="jumpToLine(' + n.toString() + ');"  href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + n.toString() + '</span></a> : <span class="warningText">' + e + "</span>";
		errorStrings.indexOf(r) >= 0 && !t || (consolePrint(r, !0), errorStrings.push(r), errorStrings.length > MAX_ERRORS_FOR_REAL && TooManyErrors())
	}
}

function logWarningNoLine(e, n) {
	if (compiling || n) {
		var t = '<span class="warningText">' + e + "</span>";
		errorStrings.indexOf(t) >= 0 && !n || (consolePrint(t, !0), errorStrings.push(t), errorCount++, errorStrings.length > MAX_ERRORS_FOR_REAL && TooManyErrors())
	}
}

function logErrorNoLine(e, n) {
	if (compiling || n) {
		var t = '<span class="errorText">' + e + "</span>";
		errorStrings.indexOf(t) >= 0 && !n || (consolePrint(t, !0), errorStrings.push(t), errorCount++, errorStrings.length > MAX_ERRORS_FOR_REAL && TooManyErrors())
	}
}

function blankLineHandle(e) {
	"levels" === e.section ? e.levels[e.levels.length - 1].length > 0 && e.levels.push([]) : "objects" === e.section && (e.objects_section = 0)
}

function wordAlreadyDeclared(e, n) {
	if ((n = n.toLowerCase()) in e.objects) return e.objects[n];
	for (var t = 0; t < e.legend_aggregates.length; t++) {
		if (e.legend_aggregates[t][0] === n) return e.legend_aggregates[t]
	}
	for (t = 0; t < e.legend_properties.length; t++) {
		if (e.legend_properties[t][0] === n) return e.legend_properties[t]
	}
	for (t = 0; t < e.legend_synonyms.length; t++) {
		if (e.legend_synonyms[t][0] === n) return e.legend_synonyms[t]
	}
	return null
}
"function" != typeof Object.assign && (Object.assign = function(e) {
	"use strict";
	if (null == e) throw new TypeError("Cannot convert undefined or null to object");
	for (var n = Object(e), t = 1; t < arguments.length; t++) {
		var r = arguments[t];
		if (null != r)
			for (var i in r) r.hasOwnProperty(i) && (n[i] = r[i])
	}
	return n
});
var codeMirrorFn = function() {
	"use strict";

	function e(e, n) {
		if (void 0 === e.objects[n]) {
			for (var t = 0; t < e.legend_synonyms.length; t++) {
				if (e.legend_synonyms[t][0] == n) return
			}
			for (t = 0; t < e.legend_aggregates.length; t++) {
				if (e.legend_aggregates[t][0] == n) return
			}
			for (t = 0; t < e.legend_properties.length; t++) {
				if (e.legend_properties[t][0] == n) return
			}
			logError(`You're talking about ${n.toUpperCase()} but it's not defined anywhere.`, e.lineNumber)
		}
	}

	function n(e, n, t, r) {
		var i = new RegExp("\\b" + (n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "\\b"), "i"),
			o = t.match(i);
		null != o && (e.original_case_names[n] = o[0], e.original_line_numbers[n] = r)
	}
	const t = ["objects", "legend", "sounds", "collisionlayers", "rules", "winconditions", "levels"],
		r = ["sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again"],
		i = /[\p{L}\p{N}_]+[\p{Z}\s]*/u,
		o = /\d+\b/u,
		a = /(objects|collisionlayers|legend|sounds|rules|winconditions|levels)(?![\p{L}\p{N}_])[\p{Z}\s]*/u,
		l = /[\=]+/,
		s = /[^\(]+/,
		c = /[^\p{Z}\s\()]+[\p{Z}\s]*/u,
		u = /[ \,]*/,
		d = /(move|action|create|destroy|cantmove)\b[\p{Z}\s]*/u,
		h = ["move", "cantmove"],
		f = /(undo|restart|titlescreen|startgame|cancel|endgame|startlevel|endlevel|showmessage|closemessage|sfx0|sfx1|sfx2|sfx3|sfx4|sfx5|sfx6|sfx7|sfx8|sfx9|sfx10)\b[\p{Z}\s]*/u,
		p = /^(action|up|down|left|right|\^|v|\<|\>|moving|stationary|parallel|perpendicular|horizontal|orthogonal|vertical|no|randomdir|random)$/,
		g = /^(startloop|endloop)$/,
		m = /^(up|down|left|right|horizontal|vertical|orthogonal|late|rigid)$/,
		v = /[\p{Z}\s]*(up|down|left|right|horizontal|vertical|orthogonal)(?![\p{L}\p{N}_])[\p{Z}\s]*/u,
		y = /^(all|any|no|some)$/,
		b = ["checkpoint", "objects", "collisionlayers", "legend", "sounds", "rules", "...", "winconditions", "levels", "|", "[", "]", "up", "down", "left", "right", "late", "rigid", "^", "v", ">", "<", "no", "randomdir", "random", "horizontal", "vertical", "any", "all", "no", "some", "moving", "stationary", "parallel", "perpendicular", "action", "message", "move", "action", "create", "destroy", "cantmove", "sfx0", "sfx1", "sfx2", "sfx3", "Sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again", "undo", "restart", "titlescreen", "startgame", "cancel", "endgame", "startlevel", "endlevel", "showmessage", "closemessage"];

	function w(e) {
		var n = e.match(c, !0);
		return null === n && (n = e.match(s, !0)), n
	}

	function _(t, r) {
		var i = !0,
			o = t.current_line_wip_array;
		if (0 !== o.length)
			if (1 === o.length) logError('Incorrect format of legend - should be one of "A = B", "A = B or C [ or D ...]", "A = B and C [ and D ...]".', t.lineNumber), i = !1;
			else if (o.length % 2 == 0) logError(`Incorrect format of legend - should be one of "A = B", "A = B or C [ or D ...]", "A = B and C [ and D ...]", but it looks like you have a dangling "${t.current_line_wip_array[t.current_line_wip_array.length-1].toUpperCase()}"?`, t.lineNumber), i = !1;
		else {
			var a = o[0],
				l = wordAlreadyDeclared(t, a);
			null !== l && (logError(`Name "${a.toUpperCase()}" already in use (on line <a onclick="jumpToLine(${l.lineNumber});" href="javascript:void(0);"><span class="errorTextLineNumber">line ${l.lineNumber}</span></a>).`, t.lineNumber), i = !1), b.indexOf(a) >= 0 && logWarning('You named an object "' + a.toUpperCase() + "\", but this is a keyword. Don't do that!", t.lineNumber);
			for (var s = 2; s < o.length; s += 2) {
				var c = o[s];
				if (c === a) {
					logError("You can't define object " + a.toUpperCase() + " in terms of itself!", t.lineNumber), i = !1;
					for (var u = o.indexOf(a, 2); u >= 2;) u >= 4 ? o.splice(u - 1, 2) : o.splice(u, 2), u = o.indexOf(a, 2)
				}
				for (var d = 2; d < s; d += 2) {
					var h = o[d];
					h === c && logWarning("You're repeating the object " + h.toUpperCase() + " here multiple times on the RHS.  This makes no sense.  Don't do that.", t.lineNumber)
				}
			}
			for (s = 2; s < o.length; s += 2) {
				var f = o[s];
				f !== a && e(t, f)
			}
			if (3 === o.length) {
				var p = [o[0], o[2]];
				p.lineNumber = t.lineNumber, n(t, o[0], r, t.lineNumber), t.legend_synonyms.push(p)
			} else if ("and" === o[3]) {
				var g = function(e) {
						if ((e = e.toLowerCase()) in t.objects) return [e];
						for (var n = 0; n < t.legend_synonyms.length; n++) {
							if ((r = t.legend_synonyms[n])[0] === e) return g(r[1])
						}
						for (n = 0; n < t.legend_aggregates.length; n++) {
							if ((r = t.legend_aggregates[n])[0] === e) return [].concat.apply([], r.slice(1).map(g))
						}
						for (n = 0; n < t.legend_properties.length; n++) {
							var r;
							if ((r = t.legend_properties[n])[0] === e) return logError("Cannot define an aggregate (using 'and') in terms of properties (something that uses 'or').", t.lineNumber), i = !1, [e]
						}
						return [e]
					},
					m = [o[0]].concat(g(o[2])).concat(g(o[4]));
				for (s = 6; s < o.length; s += 2) m = m.concat(g(o[s]));
				m.lineNumber = t.lineNumber, n(t, m[0], r, t.lineNumber), t.legend_aggregates.push(m)
			} else if ("or" === o[3]) {
				var v = !0;
				for (g = function(e) {
						if ((e = e.toLowerCase()) in t.objects) return [e];
						for (var n = 0; n < t.legend_synonyms.length; n++) {
							if ((r = t.legend_synonyms[n])[0] === e) return g(r[1])
						}
						for (n = 0; n < t.legend_aggregates.length; n++) {
							(r = t.legend_aggregates[n])[0] === e && (logError("Cannot define a property (something defined in terms of 'or') in terms of aggregates (something that uses 'and').", t.lineNumber), v = !1)
						}
						for (n = 0; n < t.legend_properties.length; n++) {
							var r;
							if ((r = t.legend_properties[n])[0] === e) {
								for (var i = [], o = 1; o < r.length; o++) r[o] === e || (i = i.concat(g(r[o])));
								return i
							}
						}
						return [e]
					}, s = 5; s < o.length; s += 2)
					if ("or" !== o[s].toLowerCase()) {
						v = !1;
						break
					} if (v) {
					for (m = [o[0]].concat(g(o[2])).concat(g(o[4])), s = 6; s < o.length; s += 2) m.push(o[s].toLowerCase());
					m.lineNumber = t.lineNumber, n(t, m[0], r, t.lineNumber), t.legend_properties.push(m)
				}
			} else i && (logError("This legend-entry is incorrectly-formatted - it should be one of A = B, A = B or C ( or D ...), A = B and C (and D ...)", t.lineNumber), i = !1)
		}
	}

	function C(e) {
		if (0 !== e.current_line_wip_array.length)
			if ("ERROR" === e.current_line_wip_array[e.current_line_wip_array.length - 1]);
			else {
				var n = e.current_line_wip_array;
				n.push(e.lineNumber), e.sounds.push(n)
			}
	}

	function k(e, n) {
		"legend" === e.section ? _(e, n) : "sounds" === e.section && C(e)
	}
	return {
		copyState: function(e) {
			var n = {};
			for (var t in e.objects)
				if (e.objects.hasOwnProperty(t)) {
					var r = e.objects[t];
					n[t] = {
						colors: r.colors.concat([]),
						lineNumber: r.lineNumber,
						spritematrix: r.spritematrix.concat([])
					}
				} var i = [];
			for (t = 0; t < e.collisionLayers.length; t++) i.push(e.collisionLayers[t].concat([]));
			var o = [],
				a = [],
				l = [],
				s = [],
				c = [],
				u = [],
				d = [];
			for (t = 0; t < e.legend_synonyms.length; t++) o.push(e.legend_synonyms[t].concat([]));
			for (t = 0; t < e.legend_aggregates.length; t++) a.push(e.legend_aggregates[t].concat([]));
			for (t = 0; t < e.legend_properties.length; t++) l.push(e.legend_properties[t].concat([]));
			for (t = 0; t < e.sounds.length; t++) s.push(e.sounds[t].concat([]));
			for (t = 0; t < e.levels.length; t++) c.push(e.levels[t].concat([]));
			for (t = 0; t < e.winconditions.length; t++) u.push(e.winconditions[t].concat([]));
			for (t = 0; t < e.rules.length; t++) d.push(e.rules[t].concat([]));
			var h = Object.assign({}, e.original_case_names),
				f = Object.assign({}, e.original_line_numbers);
			return {
				lineNumber: e.lineNumber,
				objects: n,
				collisionLayers: i,
				commentLevel: e.commentLevel,
				section: e.section,
				visitedSections: e.visitedSections.concat([]),
				line_should_end: e.line_should_end,
				line_should_end_because: e.line_should_end_because,
				sol_after_comment: e.sol_after_comment,
				objects_candname: e.objects_candname,
				objects_section: e.objects_section,
				objects_spritematrix: e.objects_spritematrix.concat([]),
				tokenIndex: e.tokenIndex,
				current_line_wip_array: e.current_line_wip_array.concat([]),
				legend_synonyms: o,
				legend_aggregates: a,
				legend_properties: l,
				sounds: s,
				rules: d,
				names: e.names.concat([]),
				winconditions: u,
				original_case_names: h,
				original_line_numbers: f,
				abbrevNames: e.abbrevNames.concat([]),
				metadata: e.metadata.concat([]),
				metadata_lines: Object.assign({}, e.metadata_lines),
				levels: c,
				STRIDE_OBJ: e.STRIDE_OBJ,
				STRIDE_MOV: e.STRIDE_MOV
			}
		},
		blankLine: function(e) {
			"levels" === e.section && e.levels[e.levels.length - 1].length > 0 && e.levels.push([])
		},
		token: function(e, c) {
			var x = e.string,
				S = e.sol();
			if (S && (c.current_line_wip_array = [], e.string = e.string.toLowerCase(), c.tokenIndex = 0, c.line_should_end = !1), c.sol_after_comment && (S = !0, c.sol_after_comment = !1), e.eatWhile(/[ \t]/), "(" === (A = e.peek()) && -4 !== c.tokenIndex) e.next(), c.commentLevel++;
			else if (")" === A) {
				if (e.next(), !(c.commentLevel > 0)) return logWarning("You're trying to close a comment here, but I can't find any opening bracket to match it? [This is highly suspicious; you probably want to fix it.]", c.lineNumber), "ERROR";
				if (c.commentLevel--, 0 === c.commentLevel) return "comment"
			}
			if (c.commentLevel > 0) {
				for (S && (c.sol_after_comment = !0); e.eatWhile(/[^\(\)]+/), !e.eol() && ("(" === (A = e.peek()) ? c.commentLevel++ : ")" === A && c.commentLevel--, e.next(), 0 !== c.commentLevel););
				return e.eol() && k(c, x), "comment"
			}
			if (e.eatWhile(/[ \t]/), S && e.eol()) return k(c, x), blankLineHandle(c);
			if (c.line_should_end && !e.eol()) return logError("Only comments should go after " + c.line_should_end_because + " on a line.", c.lineNumber), e.skipToEnd(), "ERROR";
			if (S && e.match(l, !0)) return c.line_should_end = !0, c.line_should_end_because = "a bunch of equals signs ('===')", "EQUALSBIT";
			var M = e.match(a, !0);
			if (S && M) {
				c.section = M[0].trim(), c.visitedSections.indexOf(c.section) >= 0 && logError('cannot duplicate sections (you tried to duplicate "' + c.section.toUpperCase() + '").', c.lineNumber), c.line_should_end = !0, c.line_should_end_because = `a section name ("${c.section.toUpperCase()}")`, c.visitedSections.push(c.section);
				var E = t.indexOf(c.section);
				if (0 == E ? (c.objects_section = 0, c.visitedSections.length > 1 && logError('section "' + c.section.toUpperCase() + '" must be the first section', c.lineNumber)) : -1 == c.visitedSections.indexOf(t[E - 1]) && logError(-1 === E ? 'no such section as "' + c.section.toUpperCase() + '".' : 'section "' + c.section.toUpperCase() + '" is out of order, must follow  "' + t[E - 1].toUpperCase() + '" (or it could be that the section "' + t[E - 1].toUpperCase() + '"is just missing totally.  You have to include all section headings, even if the section itself is empty).', c.lineNumber), "sounds" === c.section) {
					for (var R in c.objects) c.objects.hasOwnProperty(R) && c.names.push(R);
					for (var T = 0; T < c.legend_synonyms.length; T++) {
						R = c.legend_synonyms[T][0];
						c.names.push(R)
					}
					for (T = 0; T < c.legend_aggregates.length; T++) {
						R = c.legend_aggregates[T][0];
						c.names.push(R)
					}
					for (T = 0; T < c.legend_properties.length; T++) {
						R = c.legend_properties[T][0];
						c.names.push(R)
					}
				} else if ("levels" === c.section) {
					for (var R in c.objects) c.objects.hasOwnProperty(R) && 1 == R.length && c.abbrevNames.push(R);
					for (T = 0; T < c.legend_synonyms.length; T++) 1 == c.legend_synonyms[T][0].length && c.abbrevNames.push(c.legend_synonyms[T][0]);
					for (T = 0; T < c.legend_aggregates.length; T++) 1 == c.legend_aggregates[T][0].length && c.abbrevNames.push(c.legend_aggregates[T][0])
				}
				return "HEADER"
			}
			if (void 0 === c.section && logError('must start with section "OBJECTS"', c.lineNumber), e.eol()) return k(c, x), null;
			switch (c.section) {
				case "objects":
					var L = function() {
						var t = S ? e.match(i, !0) : e.match(/[^\p{Z}\s\()]+[\p{Z}\s]*/u, !0);
						if (null == t) return e.match(s, !0), e.pos > 0 && logWarning('Unknown junk in object section (possibly: sprites have to be 5 pixels wide and 5 pixels high exactly. Or maybe: the main names for objects have to be words containing only the letters a-z0.9 - if you want to call them something like ",", do it in the legend section).', c.lineNumber), "ERROR";
						var r = t[0].trim();
						if (void 0 !== c.objects[r]) return logError('Object "' + r.toUpperCase() + '" defined multiple times.', c.lineNumber), "ERROR";
						for (var o = 0; o < c.legend_synonyms.length; o++) {
							c.legend_synonyms[o][0] == r && logError('Name "' + r.toUpperCase() + '" already in use.', c.lineNumber)
						}
						if (b.indexOf(r) >= 0 && logWarning('You named an object "' + r.toUpperCase() + "\", but this is a keyword. Don't do that!", c.lineNumber), S) c.objects_candname = r, n(c, r, x, c.lineNumber), c.objects[c.objects_candname] = {
							lineNumber: c.lineNumber,
							colors: [],
							spritematrix: []
						};
						else {
							n(c, r, x, c.lineNumber);
							var a = [r, c.objects_candname];
							a.lineNumber = c.lineNumber, c.legend_synonyms.push(a)
						}
						return c.objects_section = 1, "NAME"
					};
					switch (S && 2 == c.objects_section && (c.objects_section = 3), S && 1 == c.objects_section && (c.objects_section = 2), c.objects_section) {
						case 0:
						case 1:
							return c.objects_spritematrix = [], L();
						case 2:
							c.tokenIndex = 0;
							var I = e.match(reg_color, !0);
							if (null == I) {
								var O = e.match(i, !0) || e.match(s, !0);
								return logError("Was looking for color for object " + c.objects_candname.toUpperCase() + ', got "' + O + '" instead.', c.lineNumber), null
							}
							return void 0 === c.objects[c.objects_candname].colors ? c.objects[c.objects_candname].colors = [I[0].trim()] : c.objects[c.objects_candname].colors.push(I[0].trim()), (se = I[0].trim().toLowerCase()) in colorPalettes.arnecolors ? "COLOR COLOR-" + se.toUpperCase() : "transparent" === se ? "COLOR FADECOLOR" : "MULTICOLOR" + I[0];
						case 3:
							var A = e.eat(/[.\d]/),
								D = c.objects_spritematrix;
							if (void 0 === A) return 0 === D.length ? L() : (logError("Unknown junk in spritematrix for object " + c.objects_candname.toUpperCase() + ".", c.lineNumber), e.match(s, !0), null);
							S && D.push("");
							var N = c.objects[c.objects_candname];
							return D[D.length - 1] += A, D[D.length - 1].length > 5 ? (logWarning("Sprites must be 5 wide and 5 high.", c.lineNumber), e.match(s, !0), null) : (N.spritematrix = c.objects_spritematrix, 5 === D.length && 5 == D[D.length - 1].length && (c.objects_section = 0), "." !== A ? (R = parseInt(A)) >= N.colors.length ? (logError("Trying to access color number " + R + " from the color palette of sprite " + c.objects_candname.toUpperCase() + ", but there are only " + N.colors.length + " defined in it.", c.lineNumber), "ERROR") : "COLOR BOLDCOLOR COLOR-" + N.colors[R].toUpperCase() : "COLOR FADECOLOR");
						default:
							window.console.logError("EEK shouldn't get here.")
					}
					break;
				case "legend":
					var B = "",
						P = null;
					if (0 === c.tokenIndex) {
						var F = (P = e.match(/[^=\p{Z}\s\(]*(\p{Z}\s)*/u, !0))[0].trim();
						B = wordAlreadyDeclared(c, F) ? "ERROR" : "NAME", c.tokenIndex++
					} else if (1 === c.tokenIndex) null !== (P = e.match(/=/u, !0)) && "=" === P[0].trim() || (logError('In the legend, define new items using the equals symbol - declarations must look like "A = B", "A = B or C [ or D ...]", "A = B and C [ and D ...]".', c.lineNumber), e.match(s, !0), B = "ERROR", P = ["ERROR"]), e.match(/[\p{Z}\s]*/u, !0), c.tokenIndex++, B = "ASSSIGNMENT";
					else if (c.tokenIndex >= 3 && c.tokenIndex % 2 == 1) {
						if (null === (P = e.match(i, !0))) logError("Something bad's happening in the LEGEND", c.lineNumber), ue = e.match(s, !0), B = "ERROR";
						else "and" === (j = P[0].trim()) || "or" === j ? (B = "LOGICWORD", c.tokenIndex >= 5 && j !== c.current_line_wip_array[3] && (logError("Hey! You can't go mixing ANDs and ORs in a single legend entry.", c.lineNumber), B = "ERROR")) : (logError(`Expected and 'AND' or an 'OR' here, but got ${j.toUpperCase()} instead. In the legend, define new items using the equals symbol - declarations must look like 'A = B' or 'A = B and C' or 'A = B or C'.`, c.lineNumber), B = "ERROR");
						c.tokenIndex++
					} else if (null === (P = e.match(i, !0))) logError("Something bad's happening in the LEGEND", c.lineNumber), ue = e.match(s, !0), B = "ERROR";
					else {
						var j = P[0].trim();
						B = wordAlreadyDeclared(c, j) ? "NAME" : "ERROR", c.tokenIndex++
					}
					return null !== P && c.current_line_wip_array.push(P[0].trim()), e.eol() && _(c, x), B;
				case "sounds":
					var H = "";
					if (c.current_line_wip_array.length > 0 && "ERROR" === c.current_line_wip_array[c.current_line_wip_array.length - 1]) {
						if (null === (ue = null) && null !== (ue = e.match(f, !0)) && (H = "SOUNDEVENT"), null === ue && null !== (ue = e.match(d, !0)) && (H = "SOUNDVERB"), null === ue && null !== (ue = e.match(v, !0)) && (H = "DIRECTION"), null === ue) null !== (ue = e.match(o, !0)) && (H = "SOUND");
						null === ue && null !== (ue = e.match(i, !0)) && (H = wordAlreadyDeclared(c, ue[0].trim()) ? "NAME" : "ERROR"), null === ue && (ue = w(e), H = "ERROR")
					} else if (0 === c.current_line_wip_array.length) {
						if (null == (ue = e.match(f, !0)))
							if (null == (ue = e.match(i, !0))) H = "ERROR", ue = w(e), c.current_line_wip_array.push("ERROR"), logWarning("Was expecting a sound event (like SFX3, or ENDLEVEL) or an object name, but didn't find either.", c.lineNumber);
							else {
								var z = ue[0].trim();
								wordAlreadyDeclared(c, z) ? (H = "NAME", c.current_line_wip_array.push([z, H]), c.tokenIndex++) : (H = "ERROR", c.current_line_wip_array.push("ERROR"), logError(`unexpected sound token "${z}".`, c.lineNumber))
							}
						else H = "SOUNDEVENT", c.current_line_wip_array.push([ue[0].trim(), H]), c.tokenIndex++
					} else if (1 === c.current_line_wip_array.length) {
						if ("SOUNDEVENT" === c.current_line_wip_array[0][1]) null !== (ue = e.match(o, !0)) ? (H = "SOUND", c.current_line_wip_array.push([ue[0].trim(), H]), c.tokenIndex++) : (ue = w(e), logError("Was expecting a sound seed here (a number like 123123, like you generate by pressing the buttons above the console panel), but found something else.", c.lineNumber), H = "ERROR", c.current_line_wip_array.push("ERROR"));
						else null !== (ue = e.match(d, !0)) ? (H = "SOUNDVERB", c.current_line_wip_array.push([ue[0].trim(), H]), c.tokenIndex++) : (ue = w(e), logError("Was expecting a soundverb here (MOVE, DESTROY, CANTMOVE, or the like), but found something else.", c.lineNumber), H = "ERROR", c.current_line_wip_array.push("ERROR"))
					} else {
						if ("SOUNDEVENT" === c.current_line_wip_array[0][1]) ue = w(e), logError(`I wasn't expecting anything after the sound declaration ${c.current_line_wip_array[c.current_line_wip_array.length-1][0].toUpperCase()} on this line, so I don't know what to do with "${ue[0].trim().toUpperCase()}" here.`, c.lineNumber), H = "ERROR", c.current_line_wip_array.push("ERROR");
						else if ("SOUND" === c.current_line_wip_array[c.current_line_wip_array.length - 1][1]) ue = w(e), logError(`I wasn't expecting anything after the sound declaration ${c.current_line_wip_array[c.current_line_wip_array.length-1][0].toUpperCase()} on this line, so I don't know what to do with "${ue[0].trim().toUpperCase()}" here.`, c.lineNumber), H = "ERROR", c.current_line_wip_array.push("ERROR");
						else if (h.indexOf(c.current_line_wip_array[1][0]) >= 0) {
							var W = e.match(v, !0);
							if (null !== W) H = "DIRECTION", c.current_line_wip_array.push([W[0].trim(), H]), c.tokenIndex++;
							else null !== (U = e.match(o, !0)) ? (H = "SOUND", c.current_line_wip_array.push([U[0].trim(), H]), c.tokenIndex++) : (ue = w(e), logError(`Ah I was expecting direction or a sound seed here after ${c.current_line_wip_array[c.current_line_wip_array.length-1][0].toUpperCase()}, but I don't know what to make of "${ue[0].trim().toUpperCase()}".`, c.lineNumber), H = "ERROR", c.current_line_wip_array.push("ERROR"))
						} else {
							var U;
							null !== (U = e.match(o, !0)) ? (H = "SOUND", c.current_line_wip_array.push([U[0].trim(), H]), c.tokenIndex++) : (ue = w(e), logError(`Ah I was expecting a sound seed here after ${c.current_line_wip_array[c.current_line_wip_array.length-1][0].toUpperCase()}, but I don't know what to make of "${ue[0].trim().toUpperCase()}".`, c.lineNumber), H = "ERROR", c.current_line_wip_array.push("ERROR"))
						}
					}
					return e.eol() && C(c), H;
				case "collisionlayers":
					if (S && (c.collisionLayers.push([]), c.current_line_wip_array = [], c.tokenIndex = 0), null === (P = e.match(i, !0))) {
						var V = e.pos;
						return e.match(u, !0), e.pos == V && (logError("error detected - unexpected character " + e.peek(), c.lineNumber), e.next()), null
					}
					j = P[0].trim();
					var q = function(e) {
						if ((e = e.toLowerCase()) in c.objects) return [e];
						for (var n = 0; n < c.legend_synonyms.length; n++) {
							if ((t = c.legend_synonyms[n])[0] === e) return q(t[1])
						}
						for (n = 0; n < c.legend_aggregates.length; n++) {
							if ((t = c.legend_aggregates[n])[0] === e) return logError('"' + e + '" is an aggregate (defined using "and"), and cannot be added to a single layer because its constituent objects must be able to coexist.', c.lineNumber), []
						}
						for (n = 0; n < c.legend_properties.length; n++) {
							var t;
							if ((t = c.legend_properties[n])[0] === e) {
								for (var r = [], i = 1; i < t.length; i++) t[i] === e || (r = r.concat(q(t[i])));
								return r
							}
						}
						return logError('Cannot add "' + j.toUpperCase() + '" to a collision layer; it has not been declared.', c.lineNumber), []
					};
					"background" === j ? (c.collisionLayers.length > 0 && c.collisionLayers[c.collisionLayers.length - 1].length > 0 && logError("Background must be in a layer by itself.", c.lineNumber), c.tokenIndex = 1) : 0 !== c.tokenIndex && logError("Background must be in a layer by itself.", c.lineNumber);
					var G = q(j);
					if (0 === c.collisionLayers.length) return logError("no layers found.", c.lineNumber), "ERROR";
					var X = [],
						Y = [];
					for (T = 0; T < G.length; T++)
						for (var J = G[T], K = 0; K <= c.collisionLayers.length - 1; K++) {
							c.collisionLayers[K].indexOf(J) >= 0 && (K !== c.collisionLayers.length - 1 ? X.push(K) : Y.push(K))
						}
					if (X.length > 0) {
						var $ = 'Object "' + j.toUpperCase() + '" included in multiple collision layers ( layers ';
						for (T = 0; T < X.length; T++) $ += "#" + (X[T] + 1) + ", ";
						logWarning(($ += "#" + c.collisionLayers.length) + " ). You should fix this!", c.lineNumber)
					}
					return c.current_line_wip_array.indexOf(j) >= 0 && logWarning($ = 'Object "' + j.toUpperCase() + "\" included explicitly multiple times in the same layer. Don't do that innit.", c.lineNumber), c.current_line_wip_array.push(j), c.collisionLayers[c.collisionLayers.length - 1] = c.collisionLayers[c.collisionLayers.length - 1].concat(G), G.length > 0 ? "NAME" : "ERROR";
				case "rules":
					if (S) {
						var Q = s.exec(e.string)[0];
						c.rules.push([Q, c.lineNumber, x]), c.tokenIndex = 0
					}
					if (-4 === c.tokenIndex) return e.skipToEnd(), "MESSAGE";
					if (e.match(/[\p{Z}\s]*->[\p{Z}\s]*/u, !0)) return "ARROW";
					if ("[" === A || "|" === A || "]" === A || "+" === A) return "+" !== A && (c.tokenIndex = 1), e.next(), e.match(/[\p{Z}\s]*/u, !0), "BRACKET";
					var Z = e.match(/[^\[\|\]\p{Z}\s]*/u, !0)[0].trim();
					return 0 === c.tokenIndex && g.exec(Z) ? "BRACKET" : 0 === c.tokenIndex && m.exec(Z) || 1 === c.tokenIndex && p.exec(Z) ? (e.match(/[\p{Z}\s]*/u, !0), "DIRECTION") : c.names.indexOf(Z) >= 0 ? S ? (logError("Objects cannot appear outside of square brackets in rules, only directions can.", c.lineNumber), "ERROR") : (e.match(/[\p{Z}\s]*/u, !0), "NAME") : "..." === Z || "rigid" === Z || "random" === Z ? "DIRECTION" : r.indexOf(Z) >= 0 ? ("message" === Z && (c.tokenIndex = -4), "COMMAND") : (logError('Name "' + Z + '", referred to in a rule, does not exist.', c.lineNumber), "ERROR");
				case "winconditions":
					if (S) {
						var ee = s.exec(e.string)[0].split(/[\p{Z}\s]/u).filter((function(e) {
							return "" !== e
						}));
						ee.push(c.lineNumber), c.winconditions.push(ee), c.tokenIndex = -1
					}
					if (c.tokenIndex++, null === (ue = e.match(/[\p{Z}\s]*[\p{L}\p{N}_]+[\p{Z}\s]*/u))) return logError("incorrect format of win condition.", c.lineNumber), e.match(s, !0), "ERROR";
					var ne = ue[0].trim();
					return 0 === c.tokenIndex ? y.exec(ne) ? "LOGICWORD" : (logError('Expecting the start of a win condition ("ALL","SOME","NO") but got "' + ne.toUpperCase() + "'.", c.lineNumber), "ERROR") : 2 === c.tokenIndex ? "on" != ne ? (logError('Expecting the word "ON" but got "' + ne.toUpperCase() + '".', c.lineNumber), "ERROR") : "LOGICWORD" : 1 === c.tokenIndex || 3 === c.tokenIndex ? -1 === c.names.indexOf(ne) ? (logError('Error in win condition: "' + ne.toUpperCase() + '" is not a valid object name.', c.lineNumber), "ERROR") : "NAME" : (logError("Error in win condition: I don't know what to do with " + ne.toUpperCase() + ".", c.lineNumber), "ERROR");
				case "levels":
					if (S) {
						if (e.match(/[\p{Z}\s]*message\b[\p{Z}\s]*/u, !0)) {
							c.tokenIndex = -4;
							var te = ["\n", x.slice(e.pos).trim(), c.lineNumber];
							return 0 == c.levels[c.levels.length - 1].length ? c.levels.splice(c.levels.length - 1, 0, te) : c.levels.push(te), "MESSAGE_VERB"
						}
						if (e.match(/[\p{Z}\s]*message[\p{Z}\s]*/u, !0)) {
							logWarning("You probably meant to put a space after 'message' innit.  That's ok, I'll still interpret it as a message, but you probably want to put a space there.", c.lineNumber), c.tokenIndex = -4;
							te = ["\n", x.slice(e.pos).trim(), c.lineNumber];
							return 0 == c.levels[c.levels.length - 1].length ? c.levels.splice(c.levels.length - 1, 0, te) : c.levels.push(te), "MESSAGE_VERB"
						}
						var re = e.match(s, !1);
						if (null === re || 0 === re.length) return logError("Detected a comment where I was expecting a level. Oh gosh; if this is to do with you using '(' as a character in the legend, please don't do that ^^", c.lineNumber), c.commentLevel++, e.skipToEnd(), "comment";
						var ie = re[0].trim();
						c.tokenIndex = 2;
						var oe = c.levels[c.levels.length - 1];
						"\n" == oe[0] ? c.levels.push([c.lineNumber, ie]) : (0 == oe.length && oe.push(c.lineNumber), oe.push(ie), oe.length > 1 && ie.length != oe[1].length && logWarning("Maps must be rectangular, yo (In a level, the length of each row must be the same).", c.lineNumber))
					} else if (-4 == c.tokenIndex) return e.skipToEnd(), "MESSAGE";
					if (2 === c.tokenIndex && !e.eol()) {
						A = e.peek();
						return e.next(), c.abbrevNames.indexOf(A) >= 0 ? "LEVEL" : (logError('Key "' + A.toUpperCase() + '" not found. Do you need to add it to the legend, or define a new object?', c.lineNumber), "ERROR")
					}
					break;
				default:
					if (S && (c.tokenIndex = 0), 0 != c.tokenIndex) {
						e.match(s, !0), c.tokenIndex++;
						var ae = c.metadata[c.metadata.length - 2],
							le = c.metadata[c.metadata.length - 1];
						if (c.tokenIndex > 2) return logWarning("Error: you can't embed comments in metadata values. Anything after the comment will be ignored.", c.lineNumber), "ERROR";
						if ("background_color" === ae || "text_color" === ae) {
							var se;
							if ((se = le.trim().toLowerCase()) in colorPalettes.arnecolors) return "COLOR COLOR-" + se.toUpperCase();
							if ("transparent" === se) return "COLOR FADECOLOR";
							if (4 === se.length || 7 === se.length) {
								var ce = se.match(/#[0-9a-fA-F]+/);
								if (null !== ce) return "MULTICOLOR" + ce[0]
							}
						}
						return "METADATATEXT"
					}
					var ue;
					if (null !== (ue = e.match(/[\p{Z}\s]*[\p{L}\p{N}_]+[\p{Z}\s]*/u))) {
						var de = ue[0].trim();
						if (S) {
							if (["title", "author", "homepage", "background_color", "text_color", "key_repeat_interval", "realtime_interval", "again_interval", "flickscreen", "zoomscreen", "color_palette", "youtube"].indexOf(de) >= 0) {
								if ("author" !== de && "homepage" !== de && "title" !== de || (e.string = x), "youtube" === de && logWarning("Unfortunately, YouTube support hasn't been working properly for a long time - it was always a hack and it hasn't gotten less hacky over time, so I can no longer pretend to support it.", c.lineNumber), null !== (fe = e.match(s, !1))) {
									if (c.metadata.push(de), c.metadata.push(fe[0].trim()), de in c.metadata_lines) {
										var he = c.metadata_lines[de];
										logWarning(`You've already defined a ${de.toUpperCase()} in the prelude on line <a onclick="jumpToLine(${he})>${he}</a>.`, c.lineNumber)
									}
									c.metadata_lines[de] = c.lineNumber
								} else logError('MetaData "' + de + '" needs a value.', c.lineNumber);
								return c.tokenIndex = 1, "METADATA"
							}
							if (["run_rules_on_level_start", "norepeat_action", "require_player_movement", "debug", "verbose_logging", "throttle_movement", "noundo", "noaction", "norestart", "scanline"].indexOf(de) >= 0) {
								var fe;
								if (c.metadata.push(de), c.metadata.push("true"), c.tokenIndex = -1, null !== (fe = e.match(s, !1))) {
									var pe = fe[0].trim();
									logWarning("MetaData " + de.toUpperCase() + " doesn't take any parameters, but you went and gave it \"" + pe + '".', c.lineNumber)
								}
								return "METADATA"
							}
							return logError("Unrecognised stuff in the prelude.", c.lineNumber), "ERROR"
						}
						return -1 == c.tokenIndex ? (logError('MetaData "' + de + '" has no parameters.', c.lineNumber), "ERROR") : "METADATA"
					}
			}
			return e.eol() ? null : e.eol() ? void 0 : (e.next(), null)
		},
		startState: function() {
			return {
				objects: {},
				lineNumber: 0,
				commentLevel: 0,
				section: "",
				visitedSections: [],
				line_should_end: !1,
				line_should_end_because: "",
				sol_after_comment: !1,
				objects_candname: "",
				objects_section: 0,
				objects_spritematrix: [],
				collisionLayers: [],
				tokenIndex: 0,
				current_line_wip_array: [],
				legend_synonyms: [],
				legend_aggregates: [],
				legend_properties: [],
				sounds: [],
				rules: [],
				names: [],
				winconditions: [],
				metadata: [],
				metadata_lines: {},
				original_case_names: {},
				original_line_numbers: {},
				abbrevNames: [],
				levels: [
					[]
				],
				subsection: ""
			}
		}
	}
};
window.CodeMirror.defineMode("puzzle", codeMirrorFn);
var code = document.getElementById("code"),
	_editorDirty = !1,
	_editorCleanState = "",
	fileToOpen = getParameterByName("demo");
if (null !== fileToOpen && fileToOpen.length > 0) tryLoadFile(fileToOpen), code.value = "loading...";
else {
	var gistToLoad = getParameterByName("hack");
	if (null !== gistToLoad && gistToLoad.length > 0) {
		var id = gistToLoad.replace(/[\\\/]/, "");
		tryLoadGist(id), code.value = "loading..."
	} else try {
		if (storage_has("saves")) {
			var curSaveArray = JSON.parse(storage_get("saves")),
				sd = curSaveArray[curSaveArray.length - 1];
			code.value = sd.text, (loadDropdown = document.getElementById("loadDropDown")).selectedIndex = 0
		}
	} catch (e) {}
}
CodeMirror.commands.swapLineUp = function(e) {
	for (var n = e.listSelections(), t = [], r = e.firstLine() - 1, i = [], o = 0; o < n.length; o++) {
		var a = n[o],
			l = a.from().line - 1,
			s = a.to().line;
		i.push({
			anchor: CodeMirror.Pos(a.anchor.line - 1, a.anchor.ch),
			head: CodeMirror.Pos(a.head.line - 1, a.head.ch)
		}), l > r ? t.push(l, s) : t.length && (t[t.length - 1] = s), r = s
	}
	0 !== t.length && e.operation((function() {
		for (var n = 0; n < t.length; n += 2) {
			var r = t[n],
				o = t[n + 1],
				a = e.getLine(r);
			e.replaceRange("", CodeMirror.Pos(r, 0), CodeMirror.Pos(r + 1, 0), "+swapLine"), o > e.lastLine() ? e.replaceRange("\n" + a, CodeMirror.Pos(e.lastLine()), null, "+swapLine") : e.replaceRange(a + "\n", CodeMirror.Pos(o, 0), null, "+swapLine")
		}
		e.setSelections(i), e.scrollIntoView()
	}))
}, CodeMirror.commands.swapLineDown = function(e) {
	for (var n = e.listSelections(), t = [], r = e.lastLine() + 1, i = n.length - 1; i >= 0; i--) {
		var o = n[i],
			a = o.to().line + 1,
			l = o.from().line;
		a < r ? t.push(a, l) : t.length && (t[t.length - 1] = l), r = l
	}
	e.operation((function() {
		for (var n = t.length - 2; n >= 0; n -= 2) {
			var r = t[n],
				i = t[n + 1],
				o = e.getLine(r);
			r == e.lastLine() ? e.replaceRange("", CodeMirror.Pos(r - 1), CodeMirror.Pos(r), "+swapLine") : e.replaceRange("", CodeMirror.Pos(r, 0), CodeMirror.Pos(r + 1, 0), "+swapLine"), e.replaceRange(o + "\n", CodeMirror.Pos(i, 0), null, "+swapLine")
		}
		e.scrollIntoView()
	}))
};
var editor = window.CodeMirror.fromTextArea(code, {
	lineWrapping: !0,
	lineNumbers: !0,
	styleActiveLine: !0,
	extraKeys: {
		"Ctrl-/": "toggleComment",
		"Cmd-/": "toggleComment",
		Esc: CodeMirror.commands.clearSearch,
		"Shift-Ctrl-Up": "swapLineUp",
		"Shift-Ctrl-Down": "swapLineDown"
	}
});

function checkEditorDirty() {
	var e = document.getElementById("saveClickLink");
	_editorCleanState !== editor.getValue() ? (_editorDirty = !0, e && (e.innerHTML = "SAVE*")) : (_editorDirty = !1, e && (e.innerHTML = "SAVE"))
}

function setEditorClean() {
	if (_editorCleanState = editor.getValue(), !0 === _editorDirty) {
		var e = document.getElementById("saveClickLink");
		e && (e.innerHTML = "SAVE"), _editorDirty = !1
	}
}
editor.on("mousedown", (function(e, n) {
	"cm-SOUND" == n.target.className ? playSound(parseInt(n.target.innerHTML), !0) : "cm-LEVEL" == n.target.className && (n.ctrlKey || n.metaKey) && (document.activeElement.blur(), editor.display.input.blur(), prevent(n), compile(["levelline", e.posFromMouse(n).line]))
})), _editorCleanState = editor.getValue(), editor.on("change", (function(e, n) {
	checkEditorDirty()
}));
var debugMode, colorPalette, mapObj = {
	parallel: "&#8741;",
	perpendicular: "&#8869;"
};

function getParameterByName(e) {
	e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var n = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
	return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
}

function tryLoadGist(e) {
	var n = "https://api.github.com/gists/" + e;
	consolePrint("Contacting GitHub", !0);
	var t = new XMLHttpRequest;
	t.open("GET", n), t.onreadystatechange = function() {
		if (4 == t.readyState) {
			"" === t.responseText && consoleError("GitHub request returned nothing.  A connection fault, maybe?");
			var e = JSON.parse(t.responseText);
			if (403 === t.status) consoleError(e.message);
			else if (200 !== t.status && 201 !== t.status) consoleError("HTTP Error " + t.status + " - " + t.statusText);
			else {
				var n = e.files["script.txt"].content;
				editor.setValue(n), editor.clearHistory(), clearConsole(), setEditorClean(), unloadGame(), compile(["restart"], n)
			}
		}
	}, t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), t.send()
}

function tryLoadFile(e) {
	var n = new XMLHttpRequest;
	n.open("GET", "demo/" + e + ".txt"), n.onreadystatechange = function() {
		if (4 == n.readyState)
			if ("complete" === document.readyState) e();
			else {
				let n = t => {
					"complete" === document.readyState && (e(), document.removeEventListener("readystatechange", n))
				};
				document.addEventListener("readystatechange", n)
			}
		function e() {
			editor.setValue(n.responseText), clearConsole(), setEditorClean(), unloadGame(), compile(["restart"])
		}
	}, n.send()
}

function canExit() {
	return !_editorDirty || confirm("You haven't saved your game! Are you sure you want to lose your unsaved changes?")
}

function dropdownChange() {
	canExit() ? (tryLoadFile(this.value), this.selectedIndex = 0) : this.selectedIndex = 0
}

function debugPreview(e, n) {
	canvasResize((diffToVisualize = debug_visualisation_array[e][n]).level)
}

function debugUnpreview() {
	diffToVisualize = null, canvasResize()
}

function addToDebugTimeline(e, n) {
	debug_visualisation_array.hasOwnProperty(debugger_turnIndex) || (debug_visualisation_array[debugger_turnIndex] = []);
	var t = {
		width: e.width,
		height: e.height,
		layerCount: e.layerCount,
		turnIndex: debugger_turnIndex,
		lineNumber: n,
		objects: new Int32Array(e.objects),
		movements: new Int32Array(e.movements),
		commandQueue: e.commandQueue.concat([]),
		commandQueueSourceRules: e.commandQueueSourceRules.concat([]),
		rigidMovementAppliedMask: e.rigidMovementAppliedMask.map((e => e.clone())),
		level: e
	};
	return debug_visualisation_array[debugger_turnIndex][n] = t, `${debugger_turnIndex},${n}`
}
code.editorreference = editor, editor.setOption("theme", "midnight"), editor.on("keyup", (function(e, n) {
	CodeMirror.ExcludedIntelliSenseTriggerKeys[(n.keyCode || n.which).toString()] || CodeMirror.commands.autocomplete(e, null, {
		completeSingle: !1
	})
}));
"use strict";

function isColor(e) {
	return (e = e.trim()) in colorPalettes.arnecolors || (!!/^#([0-9A-F]{3}){1,2}$/i.test(e) || "transparent" === e)
}

function colorToHex(e, n) {
	return (n = n.trim()) in e ? e[n] : n
}

function generateSpriteMatrix(e) {
	for (var n = [], t = 0; t < e.length; t++) {
		for (var r = [], i = 0; i < e.length; i++) {
			var o = e[t].charAt(i);
			"." == o ? r.push(-1) : r.push(o)
		}
		n.push(r)
	}
	return n
}

function generateExtraMembers(e) {
	0 === e.collisionLayers.length && logError("No collision layers defined.  All objects need to be in collision layers."), e.idDict = [];
	for (var n = 0, t = 0; t < e.collisionLayers.length; t++)
		for (var r = 0; r < e.collisionLayers[t].length; r++) {
			if ((c = e.collisionLayers[t][r]) in e.objects)(f = e.objects[c]).layer = t, f.id = n, e.idDict[n] = c, n++
		}
	e.objectCount = n;
	for (var i = e.collisionLayers.length, o = [], a = 0; a < i; a++) o.push(-1);
	STRIDE_OBJ = 0 | Math.ceil(e.objectCount / 32), STRIDE_MOV = 0 | Math.ceil(i / 5), e.STRIDE_OBJ = STRIDE_OBJ, e.STRIDE_MOV = STRIDE_MOV, debugMode = !1, verbose_logging = !1, throttle_movement = !1, colorPalette = colorPalettes.arnecolors;
	for (a = 0; a < e.metadata.length; a += 2) {
		var l = e.metadata[a],
			s = e.metadata[a + 1];
		"color_palette" === l ? (s in colorPalettesAliases && (s = colorPalettesAliases[s]), void 0 === colorPalettes[s] ? logError('Palette "' + s + '" not found, defaulting to arnecolors.', 0) : colorPalette = colorPalettes[s]) : "debug" === l ? IDE && !1 === unitTesting && (debugMode = !0, cache_console_messages = !0) : "verbose_logging" === l ? IDE && !1 === unitTesting && (verbose_logging = !0, cache_console_messages = !0) : "throttle_movement" === l && (throttle_movement = !0)
	}
	for (var c in e.objects)
		if (e.objects.hasOwnProperty(c)) {
			(f = e.objects[c]).colors.length > 10 && logError("a sprite cannot have more than 10 colors.  Why you would want more than 10 is beyond me.", f.lineNumber + 1);
			for (a = 0; a < f.colors.length; a++) {
				var u = f.colors[a];
				isColor(u) ? (u = colorToHex(colorPalette, u), f.colors[a] = u) : (logError('Invalid color specified for object "' + c + '", namely "' + f.colors[a] + '".', f.lineNumber + 1), f.colors[a] = "#ff00ff")
			}
		} for (var c in e.objects) {
		if (e.objects.hasOwnProperty(c)) 0 == (f = e.objects[c]).colors.length && (logError('color not specified for object "' + c + '".', f.lineNumber), f.colors = ["#ff00ff"]), 0 === f.spritematrix.length ? f.spritematrix = [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		] : (5 === f.spritematrix.length && 5 === f.spritematrix[0].length && 5 === f.spritematrix[1].length && 5 === f.spritematrix[2].length && 5 === f.spritematrix[3].length && 5 === f.spritematrix[4].length || logWarning("Sprite graphics must be 5 wide and 5 high exactly.", f.lineNumber), f.spritematrix = generateSpriteMatrix(f.spritematrix))
	}
	var d = [],
		h = {};
	for (var c in e.objects)
		if (e.objects.hasOwnProperty(c)) {
			var f = e.objects[c];
			(y = o.concat([]))[f.layer] = f.id, h[c] = y, d.push([f.lineNumber, c])
		} for (var p = !0; p;) {
		p = !1;
		for (a = 0; a < e.legend_synonyms.length; a++) {
			l = (g = e.legend_synonyms[a])[0], s = g[1];
			l in h && void 0 !== h[l] || void 0 === h[s] || (p = !0, h[l] = h[s], d.push([g.lineNumber, l]))
		}
		for (a = 0; a < e.legend_aggregates.length; a++) {
			l = (g = e.legend_aggregates[a])[0];
			var g, m = g.slice(1),
				v = !0;
			for (r = 0; r < m.length; r++) {
				if (void 0 === h[m[r]]) {
					v = !1;
					break
				}
			}
			if ((!(l in h) || void 0 === h[l]) && v) {
				var y = o.concat([]);
				for (r = 1; r < g.length; r++) {
					c = g[r];
					if (null == (f = e.objects[c]) && logError("Object not found with name " + c, e.lineNumber), -1 == y[f.layer]) y[f.layer] = f.id;
					else if (void 0 === f.layer) logError('Object "' + c.toUpperCase() + '" has been defined, but not assigned to a layer.', g.lineNumber);
					else logError('Trying to create an aggregate object (something defined in the LEGEND section using AND) with both "' + c.toUpperCase() + '" and "' + e.idDict[y[f.layer]].toUpperCase() + "\", which are on the same layer and therefore can't coexist.", g.lineNumber)
				}
				p = !0, h[g[0]] = y, d.push([g.lineNumber, l])
			}
		}
	}
	d.sort(((e, n) => e[0] - n[0])), d = d.map((e => e[1])), e.glyphDict = h, e.glyphOrder = d;
	var b = {};
	for (a = 0; a < e.legend_aggregates.length; a++) {
		b[(C = e.legend_aggregates[a])[0]] = C.slice(1)
	}
	e.aggregatesDict = b;
	var w = {};
	for (a = 0; a < e.legend_properties.length; a++) {
		w[(C = e.legend_properties[a])[0]] = C.slice(1)
	}
	e.propertiesDict = w;
	var _ = {};
	for (a = 0; a < e.legend_synonyms.length; a++) {
		var C;
		l = (C = e.legend_synonyms[a])[0];
		(T = C[1]) in b ? b[l] = b[T] : T in w ? w[l] = w[T] : l !== T && (_[l] = T)
	}
	e.synonymsDict = _;
	for (var k, x, S = !0; S;) {
		for (var c in S = !1, _) {
			if (_.hasOwnProperty(c))(T = _[c]) in w ? (delete _[c], w[c] = w[T], S = !0) : T in b ? (delete b[c], b[c] = b[T], S = !0) : T in _ && (_[c] = _[T])
		}
		for (var c in w)
			if (w.hasOwnProperty(c)) {
				var M = w[c];
				for (a = 0; a < M.length; a++) {
					if ((T = M[a]) in _) M[a] = _[T], S = !0;
					else if (T in w) {
						M.splice(a, 1);
						var E = w[T];
						for (r = 0; r < E.length; r++) {
							var R = E[r]; - 1 === M.indexOf(R) && M.push(R)
						}
						S = !0
					}
					T in b && logError('Trying to define property "' + c.toUpperCase() + '" in terms of aggregate "' + T.toUpperCase() + '".')
				}
			} for (var c in b)
			if (b.hasOwnProperty(c))
				for (M = b[c], a = 0; a < M.length; a++) {
					var T;
					if ((T = M[a]) in _) M[a] = _[T], S = !0;
					else if (T in b) {
						M.splice(a, 1);
						for (E = b[T], r = 0; r < E.length; r++) {
							R = E[r]; - 1 === M.indexOf(R) && M.push(R)
						}
						S = !0
					}
					T in w && logError('Trying to define aggregate "' + c.toUpperCase() + '" in terms of property "' + T.toUpperCase() + '".')
				}
	}
	for (var l in e.propertiesSingleLayer = {}, w)
		if (w.hasOwnProperty(l)) {
			M = w[l];
			var L = !0;
			for (a = 1; a < M.length; a++)
				if (e.objects[M[a - 1]].layer !== e.objects[M[a]].layer) {
					L = !1;
					break
				} L && (e.propertiesSingleLayer[l] = e.objects[M[0]].layer)
		} if (void 0 === e.idDict[0] && e.collisionLayers.length > 0 && logError("You need to have some objects defined"), void 0 === e.objects.background)
		if ("background" in e.synonymsDict) {
			c = e.synonymsDict.background;
			k = (f = e.objects[c]).id, x = f.layer
		} else if ("background" in e.propertiesDict) {
		var I = e.propertiesDict.background;
		c = I[0];
		k = (f = e.objects[c]).id, x = f.layer;
		for (a = 1; a < I.length; a++) {
			var O = I[a];
			if (e.objects[O].layer !== x) logError("Background objects must be on the same layer", e.original_line_numbers.background)
		}
	} else if ("background" in e.aggregatesDict) {
		k = (f = e.objects[e.idDict[0]]).id, x = f.layer, logError("background cannot be an aggregate (declared with 'and'), it has to be a simple type, or property (declared in terms of others using 'or').", e.original_line_numbers.background)
	} else {
		null != (f = e.objects[e.idDict[0]]) && (k = f.id, x = f.layer), logError("you have to define something to be the background")
	} else k = e.objects.background.id, x = e.objects.background.layer;
	e.backgroundid = k, e.backgroundlayer = x
}

function levelFromString(e, n) {
	var t = e.backgroundlayer,
		r = (e.backgroundid, e.layerMasks[t]),
		i = new Level(n[0], n[1].length, n.length - 1, e.collisionLayers.length, null);
	i.objects = new Int32Array(i.width * i.height * STRIDE_OBJ);
	for (var o = 0; o < i.width; o++)
		for (var a = 0; a < i.height; a++) {
			var l = n[a + 1].charAt(o);
			0 == l.length && (l = n[a + 1].charAt(n[a + 1].length - 1));
			var s = e.glyphDict[l];
			if (null == s) return void 0 === e.propertiesDict[l] ? logError('Error, symbol "' + l + '", used in map, not found.', n[0] + a) : logError('Error, symbol "' + l + '" is defined using OR, and therefore ambiguous - it cannot be used in a map. Did you mean to define it in terms of AND?', n[0] + a), i;
			var c = new BitVec(STRIDE_OBJ);
			s = s.concat([]);
			for (var u = 0; u < i.layerCount; u++) s[u] >= 0 && c.ibitset(s[u]);
			for (var d = 0; d < STRIDE_OBJ; ++d) i.objects[STRIDE_OBJ * (o * i.height + a) + d] = c.data[d]
		}
	var h = i.calcBackgroundMask(e);
	for (o = 0; o < i.n_tiles; o++) {
		var f = i.getCell(o);
		r.anyBitsInCommon(f) || (f.ior(h), i.setCell(o, f))
	}
	return i
}

function levelsToArray(e) {
	for (var n = e.levels, t = [], r = 0; r < n.length; r++) {
		var i = n[r];
		if (0 != i.length)
			if ("\n" == i[0]) {
				var o = {
					message: i[1]
				};
				(splitMessage = wordwrap(o.message, intro_template[0].length)).length > 12 && logWarning("Message too long to fit on screen.", i[2]), t.push(o)
			} else {
				o = levelFromString(e, i);
				t.push(o)
			}
	}
	e.levels = t
}
Level.prototype.calcBackgroundMask = function(e) {
	void 0 === e.backgroundlayer && logError("you have to have a background layer");
	for (var n = e.layerMasks[e.backgroundlayer], t = 0; t < this.n_tiles; t++) {
		var r = this.getCell(t);
		if (r.iand(n), !r.iszero()) return r
	}
	return (r = new BitVec(STRIDE_OBJ)).ibitset(e.backgroundid), r
};
var directionaggregates = {
		horizontal: ["left", "right"],
		horizontal_par: ["left", "right"],
		horizontal_perp: ["left", "right"],
		vertical: ["up", "down"],
		vertical_par: ["up", "down"],
		vertical_perp: ["up", "down"],
		moving: ["up", "down", "left", "right", "action"],
		orthogonal: ["up", "down", "left", "right"],
		perpendicular: ["^", "v"],
		parallel: ["<", ">"]
	},
	relativeDirections = ["^", "v", "<", ">", "perpendicular", "parallel"],
	simpleAbsoluteDirections = ["up", "down", "left", "right"],
	simpleRelativeDirections = ["^", "v", "<", ">"],
	reg_directions_only = /^(\>|\<|\^|v|up|down|left|right|moving|stationary|no|randomdir|random|horizontal|vertical|orthogonal|perpendicular|parallel|action)$/,
	commandwords = ["sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again"];

function directionalRule(e) {
	for (var n = 0; n < e.lhs.length; n++) {
		if ((o = e.lhs[n]).length > 1) return !0;
		for (var t = 0; t < o.length; t++)
			for (var r = o[t], i = 0; i < r.length; i += 2)
				if (relativeDirections.indexOf(r[i]) >= 0) return !0
	}
	for (n = 0; n < e.rhs.length; n++) {
		var o = e.rhs[n];
		for (t = 0; t < o.length; t++)
			for (r = o[t], i = 0; i < r.length; i += 2)
				if (relativeDirections.indexOf(r[i]) >= 0) return !0
	}
	return !1
}

function findIndexAfterToken(e, n, t) {
	e = e.toLowerCase();
	for (var r = 0, i = 0; i <= t; i++) {
		var o = n[i];
		r = e.indexOf(o, r) + o.length
	}
	return r
}

function rightBracketToRightOf(e, n) {
	for (; n < e.length; n++)
		if ("]" === e[n]) return !0;
	return !1
}

function processRuleString(e, n, t) {
	var r = e[0],
		i = e[1],
		o = e[2];
	"+" === (r = (r = r.replace(/\[/g, " [ ").replace(/\]/g, " ] ").replace(/\|/g, " | ").replace(/\-\>/g, " -> ")).trim())[0] && (r = r.substring(0, 1) + " " + r.substring(1, r.length));
	var a = r.split(/\s/).filter((function(e) {
		return "" !== e
	}));
	0 == a.length && logError("Spooky error!  Empty line passed to rule function.", i);
	var l = 0,
		s = [],
		c = null,
		u = [],
		d = !1,
		h = !1,
		f = [],
		p = [],
		g = !1,
		m = !1,
		v = i,
		y = [],
		b = !1,
		w = !1;
	if (1 === a.length) {
		if ("startloop" === a[0]) return M = {
			bracket: 1
		};
		if ("endloop" === a[0]) return M = {
			bracket: -1
		}
	} - 1 == a.indexOf("->") && logError("A rule has to have an arrow in it.  There's no arrow here! Consider reading up about rules - you're clearly doing something weird", i);
	c = [];
	for (var _ = 0, C = 0; C < a.length; C++) {
		var k = a[C];
		switch (l) {
			case 0:
				"+" === k ? (w = !0, v === i ? (0 == t.length && logError('The "+" symbol, for joining a rule with the group of the previous rule, needs a previous rule to be applied to.', i), 0 !== C && logError('The "+" symbol, for joining a rule with the group of the previous rule, must be the first symbol on the line ', i), v = t[t.length - 1].groupNumber) : logError('Two "+"s (the "append to previous rule group" symbol) applied to the same rule.', i)) : k in directionaggregates ? s = s.concat(directionaggregates[k]) : "late" === k ? g = !0 : "rigid" === k ? m = !0 : "random" === k ? (b = !0, w && logError("A rule-group can only be marked random by the opening rule in the group (aka, a '+' and 'random' can't appear as rule modifiers on the same line).  Why? Well, you see \"random\" isn't a property of individual rules, but of whole rule groups.  It indicates that a single possible application of some rule from the whole group should be applied at random.", i)) : simpleAbsoluteDirections.indexOf(k) >= 0 ? s.push(k) : simpleRelativeDirections.indexOf(k) >= 0 ? logError('You cannot use relative directions ("^v<>") to indicate in which direction(s) a rule applies.  Use absolute directions indicators (Up, Down, Left, Right, Horizontal, or Vertical, for instance), or, if you want the rule to apply in all four directions, do not specify directions', i) : "[" == k ? (0 == s.length && (s = s.concat(directionaggregates.orthogonal)), l = 1, C--) : logError("The start of a rule must consist of some number of directions (possibly 0), before the first bracket, specifying in what directions to look (with no direction specified, it applies in all four directions).  It seems you've just entered \"" + k.toUpperCase() + '".', i);
				break;
			case 1:
				if ("[" == k) ++_ > 1 && logWarning("Multiple opening brackets without closing brackets.  Something fishy here.  Every '[' has to be closed by a ']', and you can't nest them.", i), c.length > 0 && logError('Error, malformed cell rule - encountered a "["" before previous bracket was closed', i), d = !0, c = [];
				else if (reg_directions_only.exec(k)) c.length % 2 == 1 ? logError("Error, an item can only have one direction/action at a time, but you're looking for several at once!", i) : d ? g && "no" !== k && "random" !== k && "randomdir" !== k ? logError("Movements cannot appear in late rules.", i) : c.push(k) : logWarning("Invalid syntax. Directions should be placed at the start of a rule.", i);
				else if ("|" == k) d ? c.length % 2 == 1 ? logError("In a rule, if you specify a movement, it has to act on an object.", i) : (u.push(c), c = []) : logWarning('Janky syntax.  "|" should only be used inside cell rows (the square brackety bits).', i);
				else if ("]" === k) --_ < 0 && logWarning("Multiple closing brackets without corresponding opening brackets.  Something fishy here.  Every '[' has to be closed by a ']', and you can't nest them.", i), c.length % 2 == 1 ? "..." === c[0] ? logError("Cannot end a rule with ellipses.", i) : logError("In a rule, if you specify a movement, it has to act on an object.", i) : (u.push(c), c = []), h ? p.push(u) : f.push(u), u = [], d = !1;
				else if ("->" === k) {
					if (v !== i) t[t.length - 1].late !== g && logWarning("Oh gosh you can mix late and non-late rules in a rule-group if you really want to, but gosh why would you want to do that?  What do you expect to accomplish?", i);
					d ? logWarning('Encountered an unexpected "->" inside square brackets.  It\'s used to separate states, it has no place inside them >:| .', i) : h ? logError('Error, you can only use "->" once in a rule; it\'s used to separate before and after states.', i) : h = !0
				} else if (n.names.indexOf(k) >= 0) d ? c.length % 2 == 0 ? (c.push(""), c.push(k)) : c.length % 2 == 1 && c.push(k) : logWarning("Invalid token " + k.toUpperCase() + ". Object names should only be used within cells (square brackets).", i);
				else if ("..." === k) d ? (c.push(k), c.push(k)) : logWarning("Invalid syntax, ellipses should only be used within cells (square brackets).", i);
				else if (commandwords.indexOf(k) >= 0)
					if (!1 === h ? logError("Commands should only appear at the end of rules, not in or before the pattern-detection/-replacement sections.", i) : (d || rightBracketToRightOf(a, C)) && logWarning("Commands should only appear at the end of rules, not in or before the pattern-detection/-replacement sections.", i), "message" === k) {
						var x = findIndexAfterToken(o, a, C),
							S = o.substring(x).trim();
						"" === S && (S = " "), y.push([k, S]), C = a.length
					} else y.push([k]);
				else logError('Error, malformed cell rule - was looking for cell contents, but found "' + k + '".  What am I supposed to do with this, eh, please tell me that.', i)
		}
	}
	if (g && m && logError("Late rules cannot be marked as rigid (rigid rules are all about dealing with the consequences of unresolvable movements, and late rules can't even have movements).", i), f.length != p.length) y.length > 0 && 0 == p.length || logWarning("Error, when specifying a rule, the number of matches (square bracketed bits) on the left hand side of the arrow must equal the number on the right", i);
	else
		for (C = 0; C < f.length; C++) f[C].length != p[C].length && (logError("In a rule, each pattern to match on the left must have a corresponding pattern on the right of equal length (number of cells).", i), n.invalid = !0), 0 == f[C].length && logError("You have an totally empty pattern on the left-hand side.  This will match *everything*.  You certainly don't want this.");
	0 == f.length && logError("This rule refers to nothing.  What the heck? :O", i);
	var M = {
		directions: s,
		lhs: f,
		rhs: p,
		lineNumber: i,
		late: g,
		rigid: m,
		groupNumber: v,
		commands: y,
		randomRule: b
	};
	return !1 === directionalRule(M) && M.directions.length > 1 && M.directions.splice(1), M
}

function deepCloneHS(e) {
	return e.map((function(e) {
		return e.map((function(e) {
			return e.slice()
		}))
	}))
}

function deepCloneRule(e) {
	return {
		direction: e.direction,
		lhs: deepCloneHS(e.lhs),
		rhs: deepCloneHS(e.rhs),
		lineNumber: e.lineNumber,
		late: e.late,
		rigid: e.rigid,
		groupNumber: e.groupNumber,
		commands: e.commands,
		randomRule: e.randomRule
	}
}

function rulesToArray(e) {
	for (var n = e.rules, t = [], r = [], i = 0; i < n.length; i++) {
		var o = n[i][1],
			a = processRuleString(n[i], e, t);
		void 0 === a.bracket ? t.push(a) : r.push([o, a.bracket])
	}
	e.loops = r;
	var l = [];
	for (i = 0; i < t.length; i++)
		for (var s = (g = t[i]).directions, c = 0; c < s.length; c++) {
			var u = s[c];
			if (u in directionaggregates && directionalRule(g))
				for (var d = directionaggregates[u], h = 0; h < d.length; h++) {
					var f;
					(f = deepCloneRule(g)).direction = d[h], l.push(f)
				} else(f = deepCloneRule(g)).direction = u, l.push(f)
		}
	for (i = 0; i < l.length; i++) {
		if (convertRelativeDirsToAbsolute(g = l[i]), rewriteUpLeftRules(g), atomizeAggregates(e, g), e.invalid) return;
		rephraseSynonyms(e, g)
	}
	var p = [];
	for (i = 0; i < l.length; i++) {
		var g = l[i];
		p = p.concat(concretizeMovingRule(e, g, g.lineNumber))
	}
	var m = [];
	for (i = 0; i < p.length; i++) {
		g = p[i];
		m = m.concat(concretizePropertyRule(e, g, g.lineNumber))
	}
	for (i = 0; i < m.length; i++) makeSpawnedObjectsStationary(e, m[i], g.lineNumber);
	e.rules = m
}

function containsEllipsis(e) {
	for (var n = 0; n < e.lhs.length; n++)
		for (var t = 0; t < e.lhs[n].length; t++)
			if ("..." === e.lhs[n][t][1]) return !0;
	return !1
}

function rewriteUpLeftRules(e) {
	if (!containsEllipsis(e)) {
		if ("up" == e.direction) e.direction = "down";
		else {
			if ("left" != e.direction) return;
			e.direction = "right"
		}
		for (var n = 0; n < e.lhs.length; n++) e.lhs[n].reverse(), e.rhs.length > 0 && e.rhs[n].reverse()
	}
}

function getPossibleObjectsFromCell(e, n) {
	for (var t = [], r = 0; r < n.length; r += 2) {
		n[r];
		var i = n[r + 1];
		if (i in e.objects) t.push(i);
		else if (i in e.propertiesDict)
			for (var o = e.propertiesDict[i], a = 0; a < o.length; a++) {
				var l = o[a];
				t.push(l)
			}
	}
	return t
}

function getPropertiesFromCell(e, n) {
	for (var t = [], r = 0; r < n.length; r += 2) {
		var i = n[r],
			o = n[r + 1];
		"random" != i && (o in e.propertiesDict && t.push(o))
	}
	return t
}

function getMovings(e, n) {
	for (var t = [], r = 0; r < n.length; r += 2) {
		var i = n[r],
			o = n[r + 1];
		i in directionaggregates && t.push([o, i])
	}
	return t
}

function concretizePropertyInCell(e, n, t) {
	for (var r = 0; r < e.length; r += 2) e[r + 1] === n && "random" !== e[r] && (e[r + 1] = t)
}

function concretizeMovingInCell(e, n, t, r) {
	for (var i = 0; i < e.length; i += 2) e[i] === n && e[i + 1] === t && (e[i] = r)
}

function concretizeMovingInCellByAmbiguousMovementName(e, n, t) {
	for (var r = 0; r < e.length; r += 2) e[r] === n && (e[r] = t)
}

function expandNoPrefixedProperties(e, n) {
	for (var t = [], r = 0; r < n.length; r += 2) {
		var i = n[r],
			o = n[r + 1];
		if ("no" === i && o in e.propertiesDict)
			for (var a = e.propertiesDict[o], l = 0; l < a.length; l++) {
				var s = a[l];
				t.push(i), t.push(s)
			} else t.push(i), t.push(o)
	}
	return t
}

function concretizePropertyRule(e, n, t) {
	for (var r = 0; r < n.lhs.length; r++)
		for (var i = n.lhs[r], o = 0; o < i.length; o++) i[o] = expandNoPrefixedProperties(e, i[o]), n.rhs.length > 0 && (n.rhs[r][o] = expandNoPrefixedProperties(e, n.rhs[r][o]));
	var a, l = {};
	for (o = 0; o < n.rhs.length; o++)
		for (var s = n.lhs[o], c = n.rhs[o], u = 0; u < c.length; u++)
			for (var d = getPropertiesFromCell(e, s[u]), h = getPropertiesFromCell(e, c[u]), f = 0; f < h.length; f++) {
				var p = h[f]; - 1 == d.indexOf(p) && (l[p] = !0)
			}
	for (var g = [n], m = !0; m;) {
		m = !1;
		for (r = 0; r < g.length; r++) {
			var v = g[r];
			a = !1;
			for (o = 0; o < v.lhs.length && !a; o++) {
				var y = v.lhs[o];
				for (u = 0; u < y.length && !a; u++) {
					var b = getPropertiesFromCell(e, y[u]);
					for (f = 0; f < b.length; ++f) {
						p = b[f];
						if (!e.propertiesSingleLayer.hasOwnProperty(p) || !0 === l[p]) {
							var w = e.propertiesDict[p];
							a = !0, m = !0;
							for (var _ = 0; _ < w.length; _++) {
								var C = w[_],
									k = deepCloneRule(v);
								for (var x in k.propertyReplacement = {}, v.propertyReplacement)
									if (v.propertyReplacement.hasOwnProperty(x)) {
										var S = v.propertyReplacement[x];
										k.propertyReplacement[x] = [S[0], S[1]]
									} concretizePropertyInCell(k.lhs[o][u], p, C), k.rhs.length > 0 && concretizePropertyInCell(k.rhs[o][u], p, C), void 0 === k.propertyReplacement[p] ? k.propertyReplacement[p] = [C, 1] : k.propertyReplacement[p][1] = k.propertyReplacement[p][1] + 1, g.push(k)
							}
							break
						}
					}
				}
			}
			a && (g.splice(r, 1), r--)
		}
	}
	for (r = 0; r < g.length; r++) {
		if (void 0 !== (v = g[r]).propertyReplacement)
			for (var p in v.propertyReplacement)
				if (v.propertyReplacement.hasOwnProperty(p)) {
					var M = v.propertyReplacement[p];
					C = M[0];
					if (1 === M[1])
						for (o = 0; o < v.rhs.length; o++) {
							var E = v.rhs[o];
							for (u = 0; u < E.length; u++) {
								concretizePropertyInCell(E[u], p, C)
							}
						}
				}
	}
	var R = "";
	for (r = 0; r < g.length; r++) {
		v = g[r];
		delete g.propertyReplacement;
		for (o = 0; o < v.rhs.length; o++)
			for (y = v.rhs[o], u = 0; u < y.length; u++)
				for (b = getPropertiesFromCell(e, y[u]), f = 0; f < b.length; f++) l.hasOwnProperty(b[f]) && (R = b[f])
	}
	return R.length > 0 ? (logError('This rule has a property on the right-hand side, "' + R.toUpperCase() + "\", that can't be inferred from the left-hand side.  (either for every property on the right there has to be a corresponding one on the left in the same cell, OR, if there's a single occurrence of a particular property name on the left, all properties of the same name on the right are assumed to be the same).", t), []) : g
}

function makeSpawnedObjectsStationary(e, n, t) {
	if (!n.late)
		for (var r = 0; r < n.rhs.length; r++)
			for (var i = n.lhs[r], o = n.rhs[r], a = 0; a < o.length; a++)
				for (var l = o[a], s = getPossibleObjectsFromCell(e, i[a]), c = s.map((n => e.objects[n].layer)), u = 0; u < l.length; u += 2) {
					if ("" === l[u]) {
						var d = l[u + 1];
						if (!(d in e.propertiesDict || s.indexOf(d) >= 0)) {
							var h = e.objects[d].layer; - 1 === c.indexOf(h) && (l[u] = "stationary")
						}
					}
				}
}

function concretizeMovingRule(e, n, t) {
	for (var r, i = [n], o = !0; o;) {
		o = !1;
		for (var a = 0; a < i.length; a++) {
			var l = i[a];
			r = !1;
			for (var s = 0; s < l.lhs.length; s++)
				for (var c = l.lhs[s], u = 0; u < c.length; u++) {
					if ((T = getMovings(e, c[u])).length > 0) {
						r = !0, o = !0;
						for (var d = T[0][0], h = T[0][1], f = directionaggregates[h], p = 0; p < f.length; p++) {
							var g = f[p],
								m = deepCloneRule(l);
							for (var v in m.movingReplacement = {}, l.movingReplacement)
								if (l.movingReplacement.hasOwnProperty(v)) {
									var y = l.movingReplacement[v];
									m.movingReplacement[v] = [y[0], y[1], y[2], y[3], y[4], y[5]]
								} for (var v in m.aggregateDirReplacement = {}, l.aggregateDirReplacement)
								if (l.aggregateDirReplacement.hasOwnProperty(v)) {
									y = l.aggregateDirReplacement[v];
									m.aggregateDirReplacement[v] = [y[0], y[1], y[2]]
								} if (concretizeMovingInCell(m.lhs[s][u], h, d, g), m.rhs.length > 0 && concretizeMovingInCell(m.rhs[s][u], h, d, g), void 0 === m.movingReplacement[d + h]) m.movingReplacement[d + h] = [g, 1, h, d, s, u];
							else {
								var b = m.movingReplacement[d + h];
								s === b[4] && u === b[5] || (b[1] = b[1] + 1)
							}
							void 0 === m.aggregateDirReplacement[h] ? m.aggregateDirReplacement[h] = [g, 1, h] : m.aggregateDirReplacement[h][1] = m.aggregateDirReplacement[h][1] + 1, i.push(m)
						}
					}
				}
			r && (i.splice(a, 1), a--)
		}
	}
	for (a = 0; a < i.length; a++) {
		if (void 0 !== (l = i[a]).movingReplacement) {
			var w = {};
			for (var d in l.movingReplacement)
				if (l.movingReplacement.hasOwnProperty(d)) {
					var _ = (E = l.movingReplacement[d])[0],
						C = E[1],
						k = E[2],
						x = E[3];
					if (1 === C)
						for (s = 0; s < l.rhs.length; s++) {
							var S = l.rhs[s];
							for (u = 0; u < S.length; u++) {
								concretizeMovingInCell(S[u], k, x, _)
							}
						}
				} var M = {};
			for (var d in l.aggregateDirReplacement)
				if (l.aggregateDirReplacement.hasOwnProperty(d)) {
					var E;
					_ = (E = l.aggregateDirReplacement[d])[0], C = E[1];
					M[k = E[2]] = k in M || 1 !== C ? "INVALID" : _
				} for (var k in w)
				if (w.hasOwnProperty(k) && "INVALID" !== k) {
					if ("INVALID" === (_ = w[k])) continue;
					for (s = 0; s < l.rhs.length; s++)
						for (S = l.rhs[s], u = 0; u < S.length; u++) {
							concretizeMovingInCellByAmbiguousMovementName(S[u], k, _)
						}
				} for (var k in M)
				if (M.hasOwnProperty(k) && "INVALID" !== k) {
					if ("INVALID" === (_ = M[k])) continue;
					for (s = 0; s < l.rhs.length; s++)
						for (S = l.rhs[s], u = 0; u < S.length; u++) {
							concretizeMovingInCellByAmbiguousMovementName(S[u], k, _)
						}
				}
		}
	}
	var R = "";
	for (a = 0; a < i.length; a++) {
		l = i[a];
		delete i.movingReplacement;
		for (s = 0; s < l.rhs.length; s++)
			for (c = l.rhs[s], u = 0; u < c.length; u++) {
				var T;
				(T = getMovings(e, c[u])).length > 0 && (R = T[0][1])
			}
	}
	return R.length > 0 && (logError('This rule has an ambiguous movement on the right-hand side, "' + R + "\", that can't be inferred from the left-hand side.  (either for every ambiguous movement associated to an entity on the right there has to be a corresponding one on the left attached to the same entity, OR, if there's a single occurrence of a particular ambiguous movement on the left, all properties of the same movement attached to the same object on the right are assumed to be the same (or something like that)).", t), e.invalid = !0), i
}

function rephraseSynonyms(e, n) {
	for (var t = 0; t < n.lhs.length; t++)
		for (var r = n.lhs[t], i = n.rhs[t], o = 0; o < r.length; o++) {
			for (var a = r[o], l = 1; l < a.length; l += 2) {
				a[l] in e.synonymsDict && (a[l] = e.synonymsDict[a[l]])
			}
			if (n.rhs.length > 0) {
				var s = i[o];
				for (l = 1; l < s.length; l += 2) {
					s[l] in e.synonymsDict && (s[l] = e.synonymsDict[s[l]])
				}
			}
		}
}

function atomizeAggregates(e, n) {
	for (var t = 0; t < n.lhs.length; t++)
		for (var r = n.lhs[t], i = 0; i < r.length; i++) {
			atomizeCellAggregates(e, r[i], n.lineNumber)
		}
	for (t = 0; t < n.rhs.length; t++)
		for (r = n.rhs[t], i = 0; i < r.length; i++) {
			atomizeCellAggregates(e, r[i], n.lineNumber)
		}
}

function atomizeCellAggregates(e, n, t) {
	for (var r = 0; r < n.length; r += 2) {
		var i = n[r],
			o = n[r + 1];
		if (o in e.aggregatesDict) {
			"no" === i && logError("You cannot use 'no' to exclude the aggregate object " + o.toUpperCase() + " (defined using 'AND'), only regular objects, or properties (objects defined using 'OR').  If you want to do this, you'll have to write it out yourself the long way.", t);
			var a = e.aggregatesDict[o];
			n[r + 1] = a[0];
			for (var l = 1; l < a.length; l++) n.push(n[r]), n.push(a[l])
		}
	}
}

function convertRelativeDirsToAbsolute(e) {
	for (var n = e.direction, t = 0; t < e.lhs.length; t++)
		for (var r = e.lhs[t], i = 0; i < r.length; i++) {
			absolutifyRuleCell(n, r[i])
		}
	for (t = 0; t < e.rhs.length; t++)
		for (r = e.rhs[t], i = 0; i < r.length; i++) {
			absolutifyRuleCell(n, r[i])
		}
}
var relativeDirs = ["^", "v", "<", ">", "parallel", "perpendicular"],
	relativeDict = {
		right: ["up", "down", "left", "right", "horizontal_par", "vertical_perp"],
		up: ["left", "right", "down", "up", "vertical_par", "horizontal_perp"],
		down: ["right", "left", "up", "down", "vertical_par", "horizontal_perp"],
		left: ["down", "up", "right", "left", "horizontal_par", "vertical_perp"]
	};

function absolutifyRuleCell(e, n) {
	for (var t = 0; t < n.length; t += 2) {
		var r = n[t],
			i = relativeDirs.indexOf(r);
		i >= 0 && (n[t] = relativeDict[e][i])
	}
}
var dirMasks = {
	up: parseInt("00001", 2),
	down: parseInt("00010", 2),
	left: parseInt("00100", 2),
	right: parseInt("01000", 2),
	moving: parseInt("01111", 2),
	no: parseInt("00011", 2),
	randomdir: parseInt("00101", 2),
	random: parseInt("10010", 2),
	action: parseInt("10000", 2),
	"": parseInt("00000", 2)
};

function rulesToMask(e) {
	for (var n = e.collisionLayers.length, t = [], r = 0; r < n; r++) t.push(null);
	for (r = 0; r < e.rules.length; r++)
		for (var i = e.rules[r], o = 0; o < i.lhs.length; o++)
			for (var a = i.lhs[o], l = i.rhs[o], s = 0; s < a.length; s++) {
				for (var c = a[s], u = t.concat([]), d = new BitVec(STRIDE_OBJ), h = new BitVec(STRIDE_OBJ), f = [], p = new BitVec(STRIDE_MOV), g = new BitVec(STRIDE_MOV), m = new BitVec(STRIDE_MOV), v = 0; v < c.length; v += 2) {
					if ("..." === (B = c[v])) {
						if (d = ellipsisPattern, 2 !== c.length) throw logError("You can't have anything in with an ellipsis. Sorry.", i.lineNumber), "aborting compilation";
						if (0 === s || s === a.length - 1) logError("There's no point in putting an ellipsis at the very start or the end of a rule", i.lineNumber);
						else if (i.rhs.length > 0) {
							2 === (C = l[s]).length && "..." === C[0] || logError("An ellipsis on the left must be matched by one in the corresponding place on the right.", i.lineNumber)
						}
						break
					}
					if ("random" !== B) {
						var y = c[v + 1],
							b = e.objects[y],
							w = e.objectMasks[y];
						if (b) var _ = 0 | b.layer;
						else _ = e.propertiesSingleLayer[y];
						if (void 0 === _ && logError("Oops!  " + y.toUpperCase() + " not assigned to a layer.", i.lineNumber), "no" === B) h.ior(w);
						else null !== (z = u[_]) && (i.discard = [y.toUpperCase(), z.toUpperCase()]), u[_] = y, b ? (d.ior(w), m.ishiftor(31, 5 * _)) : f.push(w), "stationary" === B ? g.ishiftor(31, 5 * _) : p.ishiftor(dirMasks[B], 5 * _)
					} else logError("RANDOM cannot be matched on the left-hand side, it can only appear on the right", i.lineNumber)
				}
				if (i.rhs.length > 0) {
					var C = l[s],
						k = a[s];
					"..." === C[0] && "..." !== k[0] && logError("An ellipsis on the right must be matched by one in the corresponding place on the left.", i.lineNumber);
					for (v = 0; v < C.length; v += 2) {
						"..." === C[v] && 2 !== C.length && logError("You can't have anything in with an ellipsis. Sorry.", i.lineNumber)
					}
				}
				if (d !== ellipsisPattern) {
					if (a[s] = new CellPattern([d, h, f, p, g, null]), d.anyBitsInCommon(h)) {
						var x = i.lineNumber;
						r > 0 && e.rules[r - 1].lineNumber === x || r + 1 < e.rules.length && e.rules[r + 1].lineNumber === x || logWarning('This rule has some content of the form "X no X" (either directly or maybe indirectly - check closely how the terms are defined if nothing stands out) which can never match and so the rule is getting removed during compilation.', i.lineNumber), e.rules.splice(r, 1), r--
					} else if (0 !== i.rhs.length) {
						var S = l[s],
							M = t.concat([]),
							E = t.concat([]),
							R = new BitVec(STRIDE_OBJ),
							T = new BitVec(STRIDE_OBJ),
							L = new BitVec(STRIDE_MOV),
							I = new BitVec(STRIDE_MOV),
							O = new BitVec(STRIDE_MOV),
							A = new BitVec(STRIDE_OBJ),
							D = new BitVec(STRIDE_MOV),
							N = new BitVec(STRIDE_MOV);
						for (v = 0; v < S.length; v += 2) {
							var B = S[v];
							y = S[v + 1];
							if ("..." === B) break;
							if ("random" !== B) {
								b = e.objects[y], w = e.objectMasks[y];
								if (b) _ = 0 | b.layer;
								else _ = e.propertiesSingleLayer[y];
								if ("no" == B) R.ior(w);
								else {
									null === (z = M[_]) && (z = E[_]), null !== z && (i.hasOwnProperty("discard") || logError("Rule matches object types that can't overlap: \"" + y.toUpperCase() + '" and "' + z.toUpperCase() + '".', i.lineNumber)), M[_] = y, B.length > 0 && D.ishiftor(31, 5 * _);
									var P = e.layerMasks[_];
									b && (T.ibitset(b.id), R.ior(P), O.ishiftor(31, 5 * _)), "stationary" === B && L.ishiftor(31, 5 * _), "randomdir" === B ? N.ishiftor(dirMasks[B], 5 * _) : I.ishiftor(dirMasks[B], 5 * _)
								}
							} else if (y in e.objectMasks) {
								var F, j = e.objectMasks[y];
								A.ior(j), e.propertiesDict.hasOwnProperty(y) ? F = e.propertiesDict[y] : (logWarning(`In this rule you're asking me to spawn a random ${y.toUpperCase()} for you, but that's already a concrete single object.  You wanna be using random with properties (things defined in terms of OR in the legend) so there's some things to select between.`, i.lineNumber), F = [y]);
								for (var H = 0; H < F.length; H++) {
									var z, W = F[H];
									if (null !== (z = M[_ = 0 | e.objects[W].layer])) {
										var U = W.toUpperCase(),
											V = z.toUpperCase();
										U !== V && logWarning("This rule may try to spawn a " + U + " with random, but also requires a " + V + " be here, which is on the same layer - they shouldn't be able to coexist!", i.lineNumber)
									}
									E[_] = W
								}
							} else logError('You want to spawn a random "' + y.toUpperCase() + "\", but I don't know how to do that", i.lineNumber)
						}
						d.bitsSetInArray(T.data) || R.ior(d), p.bitsSetInArray(I.data) || L.ior(p);
						for (v = 0; v < n; v++) null !== u[v] && null === M[v] && (R.ior(e.layerMasks[v]), D.ishiftor(31, 5 * v));
						m.iclear(O), D.ior(m), R.iszero() && T.iszero() && L.iszero() && I.iszero() && D.iszero() && A.iszero() && N.iszero() || (a[s].replacement = new CellReplacement([R, T, L, I, D, A, N]))
					}
				} else a[s] = ellipsisPattern
			}
}

function cellRowMasks(e) {
	for (var n = [], t = e[1], r = 0; r < t.length; r++) {
		for (var i = t[r], o = new BitVec(STRIDE_OBJ), a = 0; a < i.length; a++) i[a] !== ellipsisPattern && o.ior(i[a].objectsPresent);
		n.push(o)
	}
	return n
}

function cellRowMasks_Movements(e) {
	for (var n = [], t = e[1], r = 0; r < t.length; r++) {
		for (var i = t[r], o = new BitVec(STRIDE_MOV), a = 0; a < i.length; a++) i[a] !== ellipsisPattern && o.ior(i[a].movementsPresent);
		n.push(o)
	}
	return n
}

function collapseRules(e) {
	for (var n = 0; n < e.length; n++)
		for (var t = e[n], r = 0; r < t.length; r++) {
			for (var i = t[r], o = [0, [], i.rhs.length > 0, i.lineNumber], a = [], l = 0; l < i.lhs.length; l++) a.push(0);
			o[0] = dirMasks[i.direction];
			for (l = 0; l < i.lhs.length; l++) {
				for (var s = i.lhs[l], c = 0; c < s.length; c++) s[c] === ellipsisPattern && (a[l]++, a[l] > 2 ? logError("You can't use more than two ellipses in a single cell match pattern.", i.lineNumber) : c > 0 && s[c - 1] === ellipsisPattern && logWarning("Why would you go and have two ellipses in a row like that? It's exactly the same as just having a single ellipsis, right?", i.lineNumber));
				o[1][l] = s
			}
			o.push(a), o.push(i.groupNumber), o.push(i.rigid), o.push(i.commands), o.push(i.randomRule), o.push(cellRowMasks(o)), o.push(cellRowMasks_Movements(o)), t[r] = new Rule(o)
		}
	matchCache = {}
}

function ruleGroupDiscardOverlappingTest(e) {
	if (0 !== e.length)
		for (var n = [], t = 0; t < e.length; t++) {
			var r = e[t];
			if (r.hasOwnProperty("discard")) {
				var i = 0 !== t && e[t - 1].lineNumber === r.lineNumber,
					o = t !== e.length - 1 && e[t + 1].lineNumber === r.lineNumber;
				e.splice(t, 1);
				for (var a = !1, l = 0; l < n.length; l++) {
					var s = n[l];
					if (s[0] === r.discard[0] && s[1] === r.discard[1]) {
						a = !0;
						break
					}
				}
				if (a || n.push(r.discard), !i && !o || 0 === e.length) {
					const e = n[0];
					var c = "";
					if (n.length > 1) {
						c = " (ditto for ";
						for (l = 1; l < n.length; l++) {
							l > 1 && (c += ", ", l === n.length - 1 && (c += "and "));
							const e = n[l];
							if (c += `${e[0]}/${e[1]}`, 3 === l && n.length > 4) {
								c += " etc.";
								break
							}
						}
						c += ")"
					}
					logError(`${e[0]} and ${e[1]} can never overlap${c}, but this rule requires that to happen, so it's being culled.`, r.lineNumber)
				}
				t--
			}
		}
}

function arrangeRulesByGroupNumber(e) {
	for (var n = {}, t = {}, r = 0; r < e.rules.length; r++) {
		var i = e.rules[r],
			o = n;
		i.late && (o = t), null == o[i.groupNumber] && (o[i.groupNumber] = []), o[i.groupNumber].push(i)
	}
	var a = [];
	for (var l in n) {
		if (n.hasOwnProperty(l)) ruleGroupDiscardOverlappingTest(c = n[l]), c.length > 0 && a.push(c)
	}
	var s = [];
	for (var l in t) {
		var c;
		if (t.hasOwnProperty(l)) ruleGroupDiscardOverlappingTest(c = t[l]), c.length > 0 && s.push(c)
	}
	e.rules = a, e.lateRules = s
}

function generateRigidGroupList(e) {
	for (var n = [], t = [], r = [], i = [], o = [], a = 0; a < e.rules.length; a++) {
		for (var l = e.rules[a], s = !1, c = 0; c < l.length; c++) {
			l[c].isRigid && (s = !0)
		}
		if (o[a] = s, s) {
			var u = l[0].groupNumber;
			r[u] = a;
			var d = n.length;
			t[a] = d, i[u] = d, n.push(a)
		}
	}
	if (n.length > 30) {
		var h = n[30];
		logError("There can't be more than 30 rigid groups (rule groups containing rigid members).", e.rules[h][0].lineNumber)
	}
	e.rigidGroups = o, e.rigidGroupIndex_to_GroupIndex = n, e.groupNumber_to_RigidGroupIndex = i, e.groupIndex_to_RigidGroupIndex = t
}

function getMaskFromName(e, n) {
	var t = new BitVec(STRIDE_OBJ);
	if (n in e.objects) {
		var r = e.objects[n];
		t.ibitset(r.id)
	}
	if (n in e.aggregatesDict)
		for (var i = e.aggregatesDict[n], o = 0; o < i.length; o++) {
			var a = i[o];
			r = e.objects[a];
			t.ibitset(r.id)
		}
	if (n in e.propertiesDict)
		for (i = e.propertiesDict[n], o = 0; o < i.length; o++) {
			a = i[o], r = e.objects[a];
			t.ibitset(r.id)
		}
	if (n in e.synonymsDict) {
		a = e.synonymsDict[n], r = e.objects[a];
		t.ibitset(r.id)
	}
	return t.iszero() && logErrorNoLine("error, didn't find any object called player, either in the objects section, or the legends section. there must be a player!"), t
}

function generateMasks(e) {
	e.playerMask = getMaskFromName(e, "player");
	for (var n = [], t = e.collisionLayers.length, r = 0; r < t; r++) {
		for (var i = new BitVec(STRIDE_OBJ), o = 0; o < e.objectCount; o++) {
			var a = e.idDict[o];
			(s = e.objects[a]).layer == r && i.ibitset(s.id)
		}
		n.push(i)
	}
	e.layerMasks = n;
	var l = {};
	for (var a in e.objects)
		if (e.objects.hasOwnProperty(a)) {
			var s = e.objects[a];
			l[a] = new BitVec(STRIDE_OBJ), l[a].ibitset(s.id)
		} var c = e.legend_synonyms.concat(e.legend_properties);
	c.sort((function(e, n) {
		return e.lineNumber - n.lineNumber
	}));
	for (var u = 0; u < c.length; u++) {
		var d = c[u];
		if (2 == d.length) l[d[0]] = l[d[1]];
		else {
			var h = new BitVec(STRIDE_OBJ);
			for (o = 1; o < d.length; o++) {
				a = d[o];
				h.ior(l[a])
			}
			l[d[0]] = h
		}
	}
	var f = new BitVec(STRIDE_OBJ);
	for (var p of (f.inot(), l["\nall\n"] = f, e.objectMasks = l, e.aggregateMasks = {}, Object.keys(e.aggregatesDict))) {
		var g = e.aggregatesDict[p],
			m = new BitVec(STRIDE_OBJ);
		for (u = 0; u < g.length; u++) {
			a = g[u], s = e.objects[a];
			m.ior(l[a])
		}
		e.aggregateMasks[p] = m
	}
}

function checkObjectsAreLayered(e) {
	for (var n in e.objects)
		if (e.objects.hasOwnProperty(n)) {
			for (var t = !1, r = 0; r < e.collisionLayers.length; r++) {
				for (var i = e.collisionLayers[r], o = 0; o < i.length; o++)
					if (i[o] === n) {
						t = !0;
						break
					} if (t) break
			}
			if (!1 === t) {
				var a = e.objects[n];
				logError('Object "' + n.toUpperCase() + '" has been defined, but not assigned to a layer.', a.lineNumber)
			}
		}
}

function isInt(e) {
	return !isNaN(e) && function(e) {
		return (0 | e) === e
	}(parseFloat(e))
}

function twiddleMetaData(e) {
	for (var n = {}, t = 0; t < e.metadata.length; t += 2) {
		var r = e.metadata[t],
			i = e.metadata[t + 1];
		n[r] = i
	}
	const o = function(e, n) {
			if (!isFinite(e) || !isInt(e)) return logWarning(`Wasn't able to make sense of "${e}" as a (whole number) dimension.`, n), NaN;
			var t = parseInt(e);
			return isNaN(t) && logWarning(`Wasn't able to make sense of "${e}" as a dimension.`, n), t <= 0 && logWarning(`The dimension given to me (you gave "${e}") is baad - it should be greater than 0.`, n), t
		},
		a = function(e, n) {
			var t = i.split("x");
			if (2 !== t.length) return logWarning("Dimensions must be of the form AxB.", n), null;
			var r = [o(t[0], n), o(t[1], n)];
			return !isFinite(t[0]) || !isFinite(t[1]) || isNaN(r[0]) || isNaN(r[1]) ? (logWarning(`Couldn't understand the dimensions given to me (you gave "${i}") - should be of the form AxB.`, n), null) : ((r[0] <= 0 || r[1] <= 0) && logWarning(`The dimensions given to me (you gave "${i}") are baad - they should be > 0.`, n), r)
		};
	if (void 0 !== n.flickscreen) {
		i = n.flickscreen;
		n.flickscreen = a(0, e.metadata_lines.flickscreen), null === n.flickscreen && delete n.flickscreen
	}
	if (void 0 !== n.zoomscreen) {
		i = n.zoomscreen;
		n.zoomscreen = a(0, e.metadata_lines.zoomscreen), null === n.zoomscreen && delete n.zoomscreen
	}
	e.metadata = n
}

function processWinConditions(e) {
	for (var n = [], t = 0; t < e.winconditions.length; t++) {
		var r = e.winconditions[t];
		if (0 == r.length) return;
		var i = 0;
		switch (r[0]) {
			case "no":
				i = -1;
				break;
			case "all":
				i = 1
		}
		var o, a = r[r.length - 1],
			l = r[1];
		o = 5 == r.length ? r[3] : "\nall\n";
		var s = 0,
			c = 0,
			u = !1,
			d = !1;
		l in e.objectMasks ? (u = !1, s = e.objectMasks[l]) : l in e.aggregateMasks ? (u = !0, s = e.aggregateMasks[l]) : logError('Unwelcome term "' + l + "\" found in win condition. I don't know what I'm supposed to do with this. ", a), o in e.objectMasks ? (d = !1, c = e.objectMasks[o]) : o in e.aggregateMasks ? (d = !0, c = e.aggregateMasks[o]) : logError('Unwelcome term "' + l + "\" found in win condition. I don't know what I'm supposed to do with this. ", a);
		var h = [i, s, c, a, u, d];
		n.push(h)
	}
	e.winconditions = n
}

function printCellRow(e) {
	for (var n = "[ ", t = 0; t < e.length; t++) {
		t > 0 && (n += "| ");
		for (var r = e[t], i = 0; i < r.length; i += 2) {
			var o = r[i],
				a = r[i + 1];
			n += "..." === o ? o + " " : o + " " + a + " "
		}
	}
	return n += "] "
}

function cacheRuleStringRep(e) {
	var n = "(<a onclick=\"jumpToLine('" + e.lineNumber.toString() + '\');"  href="javascript:void(0);">' + e.lineNumber + "</a>) " + e.direction.toString().toUpperCase() + " ";
	e.rigid && (n = "RIGID " + n + " "), e.randomRule && (n = "RANDOM " + n + " "), e.late && (n = "LATE " + n + " ");
	for (var t = 0; t < e.lhs.length; t++) {
		n += printCellRow(e.lhs[t])
	}
	n += "-> ";
	for (t = 0; t < e.rhs.length; t++) {
		n += printCellRow(e.rhs[t])
	}
	for (t = 0; t < e.commands.length; t++) {
		var r = e.commands[t];
		1 === r.length ? n += r[0].toString() : n = n + "(" + r[0].toString() + ", " + r[1].toString() + ") "
	}
	e.stringRep = n
}

function cacheAllRuleNames(e) {
	for (var n = 0; n < e.rules.length; n++) {
		cacheRuleStringRep(e.rules[n])
	}
}

function printRules(e) {
	for (var n = "", t = 0, r = -1, i = 0, o = 0; o < e.rules.length; o++) {
		var a = e.rules[o];
		if (t < e.loops.length && e.loops[t][0] < a.lineNumber && (n += "STARTLOOP<br>", ++t < e.loops.length && (r = e.loops[t][0], t++)), -1 !== r && r < a.lineNumber && (n += "ENDLOOP<br>", r = -1), a.hasOwnProperty("discard")) i++;
		else n += o > 0 && e.rules[o - 1].groupNumber === a.groupNumber ? "+ " : "&nbsp;&nbsp;", n += a.stringRep + "<br>"
	} - 1 !== r && (n += "ENDLOOP<br>"), n += "===========<br>", consolePrint(n = "<br>Rule Assembly : (" + (e.rules.length - i) + " rules)<br>===========<br>" + n)
}

function removeDuplicateRules(e) {
	for (var n = {}, t = -1, r = e.rules.length - 1; r >= 0; r--) {
		var i = e.rules[r],
			o = i.groupNumber;
		o !== t && (n = {});
		var a = i.stringRep;
		n.hasOwnProperty(a) ? e.rules.splice(r, 1) : n[a] = !0, t = o
	}
}

function generateLoopPoints(e) {
	var n = {},
		t = !0,
		r = 0;
	if (e.loops.length > 0) {
		for (var i = 0; i < e.loops.length; i++) {
			var o = e.loops[i];
			i % 2 == 0 ? -1 === o[1] && logError("Found an ENDLOOP, but I'm not in a loop?", o[0]) : 1 === o[1] && logError("Found a STARTLOOP, but I'm already inside a loop? (Puzzlescript can't nest loops, FWIW).", o[0])
		}
		var a = e.loops[e.loops.length - 1]; - 1 !== a[1] && logError("Yo I found a STARTLOOP without a corresponding ENDLOOP.", a[0])
	}
	for (var l = 0; l < e.loops.length; l++)
		for (o = e.loops[l], i = 0; i < e.rules.length; i++) {
			var s = (h = e.rules[i])[0],
				c = h[h.length - 1],
				u = s.lineNumber,
				d = c.lineNumber;
			if (o[0] >= u && o[0] <= d && logWarning("Found a loop point in the middle of a rule. You probably don't want to do this, right?", o[0]), t) {
				if (u >= o[0]) {
					r = i, t = !1;
					break
				}
			} else if (u >= o[0]) {
				n[i - 1] = r, t = !0;
				break
			}
		}!1 === t && (n[e.rules.length] = r);
	e.loopPoint = n, n = {}, t = !0;
	for (l = 0; l < e.loops.length; l++)
		for (o = e.loops[l], i = 0; i < e.lateRules.length; i++) {
			var h;
			s = (h = e.lateRules[i])[0], c = h[h.length - 1], u = s.lineNumber, d = c.lineNumber;
			if (t) {
				if (u >= o[0]) {
					r = i, t = !1;
					break
				}
			} else if (u >= o[0]) {
				n[i - 1] = r, t = !0;
				break
			}
		}!1 === t && (n[e.lateRules.length] = r);
	e.lateLoopPoint = n
}
var soundDirectionIndicatorMasks = {
		up: parseInt("00001", 2),
		down: parseInt("00010", 2),
		left: parseInt("00100", 2),
		right: parseInt("01000", 2),
		horizontal: parseInt("01100", 2),
		vertical: parseInt("00011", 2),
		orthogonal: parseInt("01111", 2),
		___action____: parseInt("10000", 2)
	},
	soundDirectionIndicators = ["up", "down", "left", "right", "horizontal", "vertical", "orthogonal", "___action____"];

function generateSoundData(e) {
	for (var n = {}, t = [], r = [], i = e.collisionLayers.map((e => [])), o = [], a = 0; a < e.sounds.length; a++) {
		var l = e.sounds[a];
		if (l.length <= 1) continue;
		var s = l[l.length - 1];
		if (2 === l.length) {
			logWarning("incorrect sound declaration.", s);
			continue
		}
		const E = l[0][0].trim(),
			R = l[0][1].trim(),
			T = l[1][0].trim();
		l[1][1].trim();
		var c = l[l.length - 2][0];
		if ("SOUND" !== l[l.length - 2][1] && logError('Expecting sfx data, instead found "' + c + '".', s), "SOUNDEVENT" === R) l.length > 4 ? logError("too much stuff to define a sound event.", s) : l.length > 3 && logWarning("too much stuff to define a sound event.", s), void 0 !== n[E] && logWarning(E.toUpperCase() + " already declared.", s), n[E] = c;
		else {
			for (var u = E, d = T, h = [], f = 2; f < l.length - 2; f++) "DIRECTION" === l[f][1] ? h.push(l[f][0]) : logError('Expected a direction here, but found instead "$(sound[j][0])".', s);
			h.length > 0 && "move" !== d && "cantmove" !== d && logError("Incorrect sound declaration - cannot have directions (UP/DOWN/etc.) attached to non-directional sound verbs (CREATE is not directional, but MOVE is directional).", s), "action" === d && (d = "move", h = ["___action____"]), 0 == h.length && (h = ["orthogonal"]), u in e.aggregatesDict ? logError('cannot assign sound events to aggregate objects (declared with "and"), only to regular objects, or properties, things defined in terms of "or" ("' + u + '").', s) : u in e.objectMasks || logError('Object "' + u + '" not found.', s);
			var p = e.objectMasks[u],
				g = 0;
			for (f = 0; f < h.length; f++) {
				h[f] = h[f].trim();
				var m = h[f];
				if (-1 === soundDirectionIndicators.indexOf(m)) logError('Was expecting a direction, instead found "' + m + '".', s);
				else g |= soundDirectionIndicatorMasks[m]
			}
			for (var v = [u], y = !0; y;) {
				y = !1;
				for (var b = 0; b < v.length; b++) {
					var w = v[b];
					if (w in e.synonymsDict) v[b] = e.synonymsDict[w], y = !0;
					else if (w in e.propertiesDict) {
						y = !0;
						var _ = e.propertiesDict[w];
						v.splice(b, 1), b--;
						for (var C = 0; C < _.length; C++) v.push(_[C])
					}
				}
			}
			if ("move" === d || "cantmove" === d)
				for (f = 0; f < v.length; f++) {
					var k = v[f],
						x = e.objects[k].layer,
						S = new BitVec(STRIDE_MOV);
					S.ishiftor(g, 5 * x);
					var M = {
						objectMask: p,
						directionMask: S,
						layer: x,
						seed: c
					};
					"move" === d ? i[x].push(M) : o.push(M)
				}
			switch (d) {
				case "create":
					M = {
						objectMask: p,
						seed: c
					};
					t.push(M);
					break;
				case "destroy":
					M = {
						objectMask: p,
						seed: c
					};
					r.push(M)
			}
		}
	}
	e.sfx_Events = n, e.sfx_CreationMasks = t, e.sfx_DestructionMasks = r, e.sfx_MovementMasks = i, e.sfx_MovementFailureMasks = o
}

function formatHomePage(e) {
	if ("background_color" in e.metadata ? e.bgcolor = colorToHex(colorPalette, e.metadata.background_color) : e.bgcolor = "#000000", "text_color" in e.metadata ? e.fgcolor = colorToHex(colorPalette, e.metadata.text_color) : e.fgcolor = "#FFFFFF", !1 === isColor(e.fgcolor) && (logError("text_color in incorrect format - found " + e.fgcolor + ", but I expect a color name (like 'pink') or hex-formatted color (like '#1412FA').  Defaulting to white.", e.metadata_lines.text_color), e.fgcolor = "#FFFFFF"), !1 === isColor(e.bgcolor) && (logError("background_color in incorrect format - found " + e.bgcolor + ", but I expect a color name (like 'pink') or hex-formatted color (like '#1412FA').  Defaulting to black.", e.metadata_lines.background_color), e.bgcolor = "#000000"), canSetHTMLColors && ("background_color" in e.metadata && (document.body.style.backgroundColor = e.bgcolor), "text_color" in e.metadata)) {
		var n = document.getElementById("separator");
		null != n && (n.style.color = e.fgcolor);
		for (var t = document.getElementsByTagName("a"), r = 0; r < t.length; r++) t[r].style.color = e.fgcolor;
		for (t = document.getElementsByTagName("h1"), r = 0; r < t.length; r++) t[r].style.color = e.fgcolor
	}
	if ("homepage" in e.metadata) {
		var i = e.metadata.homepage;
		i = (i = i.replace("http://", "")).replace("https://", ""), e.metadata.homepage = i
	}
}
var ifrm, MAX_ERRORS = 5;

function loadFile(e) {
	for (var n = new codeMirrorFn, t = n.startState(), r = e.split("\n"), i = 0; i < r.length; i++) {
		var o = r[i];
		t.lineNumber = i + 1;
		var a = new CodeMirror.StringStream(o, 4);
		do {
			if (n.token(a, t), errorCount > MAX_ERRORS) return void consolePrint("too many errors, aborting compilation")
		} while (!1 === a.eol())
	}
	return generateExtraMembers(t), generateMasks(t), levelsToArray(t), rulesToArray(t), t.invalid > 0 ? null : (cacheAllRuleNames(t), removeDuplicateRules(t), rulesToMask(t), debugMode && printRules(t), arrangeRulesByGroupNumber(t), collapseRules(t.rules), collapseRules(t.lateRules), generateRigidGroupList(t), processWinConditions(t), checkObjectsAreLayered(t), twiddleMetaData(t), generateLoopPoints(t), generateSoundData(t), formatHomePage(t), delete t.commentLevel, delete t.line_should_end, delete t.line_should_end_because, delete t.sol_after_comment, delete t.names, delete t.abbrevNames, delete t.objects_candname, delete t.objects_section, delete t.objects_spritematrix, delete t.section, delete t.subsection, delete t.tokenIndex, delete t.current_line_wip_array, delete t.visitedSections, delete t.loops, t)
}

function compile(e, n, t) {
	(matchCache = {}, forceRegenImages = !0, void 0 === e && (e = ["restart"]), void 0 === t && (t = null), lastDownTarget = canvas, void 0 === n) && (n = window.form1.code.editorreference.getValue() + "\n");
	!0 === canDump && (compiledText = n), errorCount = 0, compiling = !0, errorStrings = [], consolePrint("=================================");
	try {
		var r = loadFile(n)
	} catch (e) {
		consolePrint(e), console.log(e)
	} finally {
		compiling = !1
	}
	if (r && r.levels && 0 === r.levels.length && logError("No levels found.  Add some levels!", void 0, !0), errorCount > 0) {
		if (consoleError(!1 === IDE ? "<span class=\"systemMessage\">Errors detected during compilation; the game may not work correctly.  If this is an older game, and you think it just broke because of recent changes in the puzzlescript engine, please consider dropping an email to analytic@gmail.com with a link to the game and I'll try make sure it's back working ASAP.</span>" : '<span class="systemMessage">Errors detected during compilation; the game may not work correctly.</span>'), errorCount > MAX_ERRORS) return
	} else {
		for (var i = 0, o = 0; o < r.rules.length; o++) i += r.rules[o].length;
		for (o = 0; o < r.lateRules.length; o++) i += r.lateRules[o].length;
		"restart" == e[0] ? consolePrint('<span class="systemMessage">Successful Compilation, generated ' + i + " instructions.</span>") : consolePrint('<span class="systemMessage">Successful live recompilation, generated ' + i + " instructions.</span>"), IDE && void 0 !== r.metadata.title && (document.title = "PuzzleScript - " + r.metadata.title)
	}
	null !== r && setGameState(r, e, t), clearInputHistory(), consoleCacheDump()
}

function qualifyURL(e) {
	var n = document.createElement("a");
	return n.href = e, n.href
}

function jumpToLine(e) {
	var n = parent.form1.code.editorreference,
		t = n.doc.lastLine(),
		r = e - 1 - 10,
		i = e - 1 + 10,
		o = e - 1;
	r < 0 && (r = 0), i > t && (i = t), o > t && (o = t), n.scrollIntoView(r), n.scrollIntoView(i), n.scrollIntoView(o), n.setCursor(o, 0)
}
var consolecache = [];

function consolePrintFromRule(e, n, t) {
	void 0 === t && (t = !1);
	var r = dirMaskName[n.direction],
		i = '<font color="green">Rule <a onclick="jumpToLine(' + n.lineNumber + ');"  href="javascript:void(0);">' + n.lineNumber + "</a> " + r + " : " + e + "</font>";
	cache_console_messages && 0 == t ? consolecache.push([i, null, null, 1]) : addToConsole(i)
}

function consolePrint(e, n, t, r) {
	void 0 === n && (n = !1), cache_console_messages && !1 === n ? consolecache.push([e, t, r, 1]) : (consoleCacheDump(), addToConsole(e))
}
var cache_n = 0;

function addToConsole(e) {
	cache = document.createElement("div"), cache.id = "cache" + cache_n, cache.innerHTML = e, cache_n++, document.getElementById("consoletextarea").appendChild(cache), consolecache = [];
	var n = document.getElementById("lowerarea");
	n.scrollTop = n.scrollHeight
}

function consoleCacheDump() {
	if (!1 !== cache_console_messages) {
		for (var e = 0; e < consolecache.length - 1; e++) {
			var n = consolecache[e],
				t = n[0],
				r = consolecache[e + 1];
			t === r[0] && (consolecache.splice(e, 1), e--, r[3] = n[3] + 1)
		}
		var i = [],
			o = [];
		for (e = 0; e < consolecache.length; e++) {
			var a = consolecache[e],
				l = (a[0], a[1]),
				s = a[2];
			a[3];
			if (0 !== e && null != l) {
				var c = o[0];
				o[1];
				null === s && l == c ? o[2].push(a) : (o = [l, s, [a]], i.push(o))
			} else o = [l, s, [a]], i.push(o)
		}
		for (var u = "<br>", d = 0; d < i.length; d++) {
			var h = i[d],
				f = (c = h[0], s = h[1], h[2]);
			u += "<br>", null != s && (u += `<span class="hoverpreview" onmouseover="debugPreview(${s})" onmouseleave="debugUnpreview()">`);
			for (e = 0; e < f.length; e++) {
				e > 0 && (u += '<br><span class="noeye_indent"></span>');
				var p = f[e],
					g = p[0],
					m = p[3];
				m > 1 && (g += ` (x${m})`), u += g
			}
			null != s && (u += "</span>")
		}
		addToConsole(u)
	}
}

function consoleError(e) {
	consolePrint('<span class="errorText">' + e + "</span>", !0)
}

function clearConsole() {
	document.getElementById("consoletextarea").innerHTML = "";
	var e = document.getElementById("lowerarea");
	e.scrollTop = e.scrollHeight, debugger_turnIndex = 0, debug_visualisation_array = [], diffToVisualize = null
}
var audio, loadDropdown, clearConsoleClick = document.getElementById("clearConsoleClick");

function newSound(e) {
	var n = e + 100 * (1e6 * Math.random() | 1);
	parent.frames[4], document.getElementById("consoletextarea");
	consolePrint(generatorNames[e] + ' : <span class="cm-SOUND" onclick="playSound(' + n.toString() + ',true)">' + n.toString() + "</span>", !0);
	var t = generateFromSeed(n);
	t.sound_vol = SOUND_VOL, t.sample_rate = SAMPLE_RATE, t.bit_depth = BIT_DEPTH, SoundEffect.generate(t).play()
}

function buttonPress() {
	var e = document.getElementById("sounddat").value,
		n = generateFromSeed(e);
	n.sound_vol = SOUND_VOL, n.sample_rate = SAMPLE_RATE, n.bit_depth = BIT_DEPTH, SoundEffect.generate(n).play()
}

function runClick() {
	clearConsole(), compile(["restart"])
}

function dateToReadable(e, n) {
	var t = n.getFullYear(),
		r = n.getMonth() + 1,
		i = n.getDate(),
		o = n.getHours(),
		a = n.getMinutes(),
		l = n.getSeconds();
	return r < 10 && (r = "0" + r), i < 10 && (i = "0" + i), o < 10 && (o = "0" + o), a < 10 && (a = "0" + a), l < 10 && (l = "0" + l), o + ":" + a + " " + t + "-" + r + "-" + i + " " + e
}

function saveClick() {
	var e = "Untitled";
	void 0 !== state.metadata.title && (e = state.metadata.title);
	var n = {
			title: e,
			text: editor.getValue(),
			date: new Date
		},
		t = [];
	if (storage_has("saves")) t = JSON.parse(storage_get("saves"));
	if (t.length > 20 && t.splice(0, 1), t.push(n), storage_set("saves", JSON.stringify(t)), repopulateSaveDropdown(t), document.getElementById("loadDropDown").selectedIndex = 0, setEditorClean(), consolePrint("saved file to local storage", !0), window.location.href.indexOf("?hack") >= 0) {
		var r = window.location.href,
			i = r.substring(r.lastIndexOf("/") + 1).split("?")[0];
		window.history.pushState({}, document.title, "./" + i)
	}
	20 === t.length && consolePrint("WARNING: your <i>locally saved file list</i> has reached its maximum capacity of 20 files - older saved files will be deleted when you save in future.", !0)
}

function loadDropDownChange() {
	if (canExit()) {
		var e = storage_get("saves");
		null === e && consolePrint("Eek, trying to load a file, but there's no local storage found. Eek!", !0), saves = JSON.parse(e);
		for (var n = 0; n < saves.length; n++) {
			var t = saves[n];
			if (dateToReadable(t.title, new Date(t.date)) == this.value) {
				var r = t.text;
				return editor.setValue(r), clearConsole(), setEditorClean(), document.getElementById("loadDropDown").selectedIndex = 0, unloadGame(), void compile(["restart"])
			}
		}
		consolePrint("Eek, trying to load a save, but couldn't find it. :(", !0)
	} else this.selectedIndex = 0
}

function repopulateSaveDropdown(e) {
	var n = document.getElementById("loadDropDown");
	if (n.options.length = 0, void 0 === e) try {
		if (!storage_has("saves")) return;
		e = JSON.parse(storage_get("saves"))
	} catch (e) {
		return
	}(i = document.createElement("OPTION")).text = "Load", i.value = "Load", n.options.add(i);
	for (var t = e.length - 1; t >= 0; t--) {
		var r = e[t],
			i = document.createElement("OPTION"),
			o = dateToReadable(r.title, new Date(r.date));
		i.text = o, i.value = o, n.options.add(i)
	}
	n.selectedIndex = 0
}

function levelEditorClick_Fn() {
	textMode || 0 === state.levels.length ? (compile(["loadLevel", 0]), levelEditorOpened = !0, canvasResize()) : (levelEditorOpened = !levelEditorOpened, canvasResize()), lastDownTarget = canvas
}

function getAuthURL() {
	var e = window.btoa(Array.prototype.map.call(window.crypto.getRandomValues(new Uint8Array(24)), (function(e) {
		return String.fromCharCode(e)
	})).join(""));
	return "https://github.com/login/oauth/authorize?client_id=" + OAUTH_CLIENT_ID + "&scope=gist&state=" + e + "&allow_signup=true"
}

function printUnauthorized() {
	consolePrint('<br>PuzzleScript needs permission to share games through GitHub:<br><ul><li><a target="_blank" href="' + getAuthURL() + '">Give PuzzleScript permission</a></li></ul>', !0)
}

function shareClick() {
	var e = storage_get("oauth_access_token");
	if ("string" == typeof e) {
		consolePrint("<br>Sending code to github...", !0);
		var n = "Untitled PuzzleScript Script";
		void 0 !== state.metadata.title && (n = state.metadata.title + " (PuzzleScript Script)"), compile(["rebuild"]);
		var t = {
				description: n,
				public: !0,
				files: {
					"readme.txt": {
						content: "Play this game by pasting the script in http://www.puzzlescript.net/editor.html"
					},
					"script.txt": {
						content: editor.getValue()
					}
				}
			},
			r = new XMLHttpRequest;
		r.open("POST", "https://api.github.com/gists"), r.onreadystatechange = function() {
			if (4 == r.readyState) {
				var e = JSON.parse(r.responseText);
				if (403 === r.status) consoleError(e.message);
				else if (200 !== r.status && 201 !== r.status) "Unauthorized" === r.statusText ? (consoleError("Authorization check failed.  You have to log back into GitHub (or give it permission again or something)."), storage_remove("oauth_access_token")) : (consoleError("HTTP Error " + r.status + " - " + r.statusText), consoleError("Try giving puzzlescript permission again, that might fix things...")), printUnauthorized();
				else {
					var n = e.id,
						t = "play.html?p=" + n;
					t = qualifyURL(t);
					var i = "editor.html?hack=" + n,
						o = 'Link to source code:<br><a target="_blank"  href="' + (i = qualifyURL(i)) + '">' + i + "</a>";
					consolePrint('GitHub (<a onclick="githubLogOut();"  href="javascript:void(0);">log out</a>) submission successful.<br>', !0), consolePrint("<br>" + o, !0), consolePrint(errorCount > 0 ? "<br>Cannot link directly to playable game, because there are compiler errors." : '<br>The game can now be played at this url:<br><a target="_blank" href="' + t + '">' + t + "</a>", !0)
				}
			}
		}, r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.setRequestHeader("Authorization", "token " + e);
		var i = JSON.stringify(t);
		r.send(i), lastDownTarget = canvas
	} else printUnauthorized()
}

function githubLogOut() {
	storage_remove("oauth_access_token"), consolePrint('<br>Logged out of Github.<br><ul><li><a target="_blank" href="' + getAuthURL() + '">Give PuzzleScript permission</a></li></ul>', !0)
}

function rebuildClick() {
	compile(["rebuild"])
}

function post_to_url(e, n, t) {
	t = t || "post";
	var r = document.createElement("form");
	for (var i in r.setAttribute("method", t), r.setAttribute("action", e), n)
		if (n.hasOwnProperty(i)) {
			var o = document.createElement("input");
			o.setAttribute("type", "hidden"), o.setAttribute("name", i), o.setAttribute("value", n[i]), r.appendChild(o)
		} document.body.appendChild(r), r.submit()
}

function exportClick() {
	var e = editor.getValue();
	compile("restart"), buildStandalone(JSON.stringify(e))
}
clearConsoleClick.addEventListener("click", clearConsole, !1), window.addEventListener("pageshow", (function(e) {
	(e.persisted || void 0 !== window.performance && 2 === window.performance.navigation.type) && window.location.reload()
})), window.addEventListener("popstate", (function(e) {
	console.log("hey"), location.reload()
})), repopulateSaveDropdown(), (loadDropdown = document.getElementById("loadDropDown")).selectedIndex = 0, OAUTH_CLIENT_ID = "211570277eb588cddf44";
var soundbarwidth = 100,
	lowerbarheight = document.getElementById("soundbar").clientHeight,
	upperbarheight = document.getElementById("uppertoolbar").clientHeight,
	winwidth = window.innerWidth,
	winheight = window.innerHeight,
	verticaldragbarWidth = document.getElementById("verticaldragbar").clientWidth,
	horizontaldragbarHeight = document.getElementById("horizontaldragbar").clientHeight,
	minimumDimension = 100;

function resize_widths(e) {
	document.getElementById("leftpanel").style.width = e + "px", document.getElementById("righttophalf").style.left = e + verticaldragbarWidth + "px", document.getElementById("rightbottomhalf").style.left = e + verticaldragbarWidth + "px", document.getElementById("horizontaldragbar").style.left = e + verticaldragbarWidth + "px", document.getElementById("verticaldragbar").style.left = e + "px", canvasResize()
}

function resize_heights(e) {
	document.getElementById("leftpanel").style.height = window.innerHeight - upperbarheight + "px", document.getElementById("verticaldragbar").style.height = window.innerHeight - upperbarheight + "px", document.getElementById("righttophalf").style.height = e - upperbarheight + "px", document.getElementById("rightbottomhalf").style.top = e + horizontaldragbarHeight + "px", document.getElementById("horizontaldragbar").style.top = e + "px", canvasResize()
}

function resize_all(e) {
	smallmovelimit = 100, hdiff = window.innerWidth - winwidth, verticaldragbarX = parseInt(document.getElementById("verticaldragbar").style.left.replace("px", "")), hdiff > -smallmovelimit && hdiff < smallmovelimit ? verticaldragbarX += hdiff : verticaldragbarX *= window.innerWidth / winwidth, verticaldragbarX <= minimumDimension ? verticaldragbarX = minimumDimension : window.innerWidth - verticaldragbarX < soundbarwidth && (verticaldragbarX = window.innerWidth - soundbarwidth), resize_widths(verticaldragbarX), horizontaldragbarY = parseInt(document.getElementById("horizontaldragbar").style.top.replace("px", "")), vdiff = window.innerHeight - winheight, vdiff > -smallmovelimit && vdiff < smallmovelimit ? horizontaldragbarY += vdiff : horizontaldragbarY *= window.innerHeight / winheight, horizontaldragbarY <= upperbarheight + minimumDimension ? horizontaldragbarY = upperbarheight + minimumDimension : window.innerHeight - horizontaldragbarY < lowerbarheight + minimumDimension && (horizontaldragbarY = window.innerHeight - (lowerbarheight + minimumDimension + 5)), resize_heights(horizontaldragbarY), winwidth = window.innerWidth, winheight = window.innerHeight
}

function verticalDragbarMouseDown(e) {
	e.preventDefault(), document.body.style.cursor = "col-resize", window.addEventListener("mousemove", verticalDragbarMouseMove, !1), window.addEventListener("mouseup", verticalDragbarMouseUp, !1)
}

function verticalDragbarMouseMove(e) {
	e.pageX <= minimumDimension ? resize_widths(minimumDimension) : window.innerWidth - e.pageX > soundbarwidth ? resize_widths(e.pageX - 1) : resize_widths(window.innerWidth - soundbarwidth)
}

function verticalDragbarMouseUp(e) {
	document.body.style.cursor = "", window.removeEventListener("mousemove", verticalDragbarMouseMove, !1)
}

function horizontalDragbarMouseDown(e) {
	e.preventDefault(), document.body.style.cursor = "row-resize", window.addEventListener("mousemove", horizontalDragbarMouseMove, !1), window.addEventListener("mouseup", horizontalDragbarMouseUp, !1)
}

function horizontalDragbarMouseMove(e) {
	e.pageY <= upperbarheight + minimumDimension ? resize_heights(upperbarheight + minimumDimension) : window.innerHeight - e.pageY > lowerbarheight + minimumDimension ? resize_heights(e.pageY - 1) : resize_heights(window.innerHeight - lowerbarheight - minimumDimension)
}

function horizontalDragbarMouseUp(e) {
	document.body.style.cursor = "", window.removeEventListener("mousemove", horizontalDragbarMouseMove, !1)
}

function reset_panels() {
	resize_widths(Math.floor(window.innerWidth / 2)), resize_heights(Math.floor(window.innerHeight / 2)), winwidth = window.innerWidth, winheight = window.innerHeight
}
onmousemove = "mouseMove(event)", onmouseout = "mouseOut()", (el = document.getElementById("gameCanvas")).addEventListener ? (el.addEventListener("contextmenu", rightClickCanvas, !1), el.addEventListener("mousemove", mouseMove, !1), el.addEventListener("mouseout", mouseOut, !1)) : (el.attachEvent("oncontextmenu", rightClickCanvas), el.attachEvent("onmousemove", mouseMove), el.attachEvent("onmouseout", mouseOut));
for (var i = 0; i < 10; i++) {
	var el, idname = "newsound" + i;
	(el = document.getElementById(idname)).addEventListener("click", function(e) {
		return function() {
			return newSound(e)
		}
	}(i), !1)
}
var runClickLink = document.getElementById("runClickLink");
runClickLink.addEventListener("click", runClick, !1);
var saveClickLink = document.getElementById("saveClickLink");
saveClickLink.addEventListener("click", saveClick, !1);
var rebuildClickLink = document.getElementById("rebuildClickLink");
rebuildClickLink.addEventListener("click", rebuildClick, !1);
var shareClickLink = document.getElementById("shareClickLink");
shareClickLink.addEventListener("click", shareClick, !1);
var levelEditorClickLink = document.getElementById("levelEditorClickLink");
levelEditorClickLink.addEventListener("click", levelEditorClick_Fn, !1);
var exportClickLink = document.getElementById("exportClickLink");
exportClickLink.addEventListener("click", exportClick, !1);
var exampleDropdown = document.getElementById("exampleDropdown");
exampleDropdown.addEventListener("change", dropdownChange, !1);
var loadDropDown = document.getElementById("loadDropDown");
loadDropDown.addEventListener("change", loadDropDownChange, !1);
var horizontalDragbar = document.getElementById("horizontaldragbar");
horizontalDragbar.addEventListener("mousedown", horizontalDragbarMouseDown, !1);
var verticalDragbar = document.getElementById("verticaldragbar");
verticalDragbar.addEventListener("mousedown", verticalDragbarMouseDown, !1), window.addEventListener("resize", resize_all, !1), window.addEventListener("load", reset_panels, !1), window.onbeforeunload = function(e) {
	e = e || window.event;
	var n = "You have unsaved changes!";
	if (_editorDirty) return e && (e.preventDefault(), e.returnValue = n), n
};
var gestureHandler = Mobile.enable();

function makeGIF() {
	var e = RandomGen.seed;
	levelEditorOpened = !1;
	var n = document.createElement("canvas");
	n.width = screenwidth * cellwidth, n.height = screenheight * cellheight, n.style.width = screenwidth * cellwidth, n.style.height = screenheight * cellheight;
	var t = n.getContext("2d"),
		r = inputHistory.concat([]),
		i = soundHistory.concat([]);
	unitTesting = !0, levelString = compiledText;
	var o = new GIFEncoder;
	o.setRepeat(0), o.setDelay(200), o.start(), compile(["loadLevel", curlevel], levelString, e), canvasResize(), redraw(), t.drawImage(canvas, -xoffset, -yoffset), o.addFrame(t);
	for (var a = 0; a < r.length; a++) {
		var l = !1,
			s = r[a];
		for ("undo" === s ? DoUndo(!1, !0) : "restart" === s ? DoRestart() : "tick" == s ? (processInput(-1), l = !0) : processInput(s), redraw(), t.drawImage(canvas, -xoffset, -yoffset), o.addFrame(t), o.setDelay(l ? autotickinterval : repeatinterval), repeatinterval; againing;) processInput(-1), redraw(), o.setDelay(againinterval), t.drawImage(canvas, -xoffset, -yoffset), o.addFrame(t)
	}
	o.finish();
	const c = "data:image/gif;base64," + btoa(o.stream().getData());
	consolePrint('<img class="generatedgif" src="' + c + '">');
	var u = (state.metadata.title ? state.metadata.title : "puzzlescript-anim").replace(/\s+/g, "-").toLowerCase() + ".gif";
	consolePrint('<a href="' + c + '" download="' + (u = u.replace(/"/g, "")) + '">Download GIF</a>'), unitTesting = !1, inputHistory = r, soundHistory = i
}
gestureHandler && gestureHandler.setFocusElement(document.getElementById("gameCanvas"));
//# sourceMappingURL=scripts_compiled.js.map