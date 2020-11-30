'use strict'
var _typeof =
  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
    ? function (e) {
        return typeof e
      }
    : function (e) {
        return e &&
          'function' == typeof Symbol &&
          e.constructor === Symbol &&
          e !== Symbol.prototype
          ? 'symbol'
          : typeof e
      }
!(function () {
  var e =
      ('object' ===
        ('undefined' == typeof self ? 'undefined' : _typeof(self)) &&
        self.self === self &&
        self) ||
      ('object' ===
        ('undefined' == typeof global ? 'undefined' : _typeof(global)) &&
        global.global === global &&
        global) ||
      this,
    t = function () {}
  'undefined' == typeof exports || exports.nodeType
    ? (e.CPF = t)
    : ('undefined' != typeof module &&
        !module.nodeType &&
        module.exports &&
        (exports = module.exports = t),
      (exports.CPF = t))
  var r = function (e) {
      for (var t = null, r = 0; r < 9; ++r)
        t += e.toString().charAt(r) * (10 - r)
      var o = t % 11
      return o < 2 ? 0 : 11 - o
    },
    o = function (e) {
      for (var t = null, r = 0; r < 10; ++r)
        t += e.toString().charAt(r) * (11 - r)
      var o = t % 11
      return o < 2 ? 0 : 11 - o
    },
    n = function (e, t) {
      var r = '.',
        o = '-'
      return (
        'digits' === t
          ? ((r = ''), (o = ''))
          : 'checker' === t && ((r = ''), (o = '-')),
        e.length > 11
          ? 'The value contains error. Has more than 11 digits.'
          : e.length < 11
          ? 'The value contains error. Has fewer than 11 digits.'
          : e.slice(0, 3) +
            r +
            e.slice(3, 6) +
            r +
            e.slice(6, 9) +
            o +
            e.slice(9, 11)
      )
    }
  ;(t.generate = function (e) {
    for (var t = '', f = 0; f < 9; ++f)
      t += String(Math.floor(10 * Math.random()))
    var i = r(t),
      l = t + i + o(t + i)
    return n(l, e)
  }),
    (t.validate = function (e) {
      if (e && !0 !== e) {
        'number' == typeof e && (e = String(e))
        var t = e.replace(/[^\d]/g, ''),
          n = t.substring(0, 9),
          f = t.substring(9, 11)
        if (11 !== t.length) return !1
        for (var i = 0; i < 10; i++)
          if ('' + n + f === Array(12).join(i)) return !1
        var l = r(n),
          a = o('' + n + l)
        return f.toString() === l.toString() + a.toString()
      }
    }),
    (t.format = function (e, t) {
      if (e) {
        var r = e.replace(/[^\d]/g, '')
        return n(r, t)
      }
    })
})()
document.getElementById('btn-gerar-CPF').onclick = function () {
  var e = document.getElementById('formatacao').value,
    t = document.getElementById('origem').value,
    a =
      (CPF.format(CPF.generate(), e),
      document.getElementById('quantidade').value),
    n = document.getElementById('cpf-gerado')
  if ('none' == t) {
    for (var r = CPF.format(CPF.generate(), e), o = 1; o < a; ++o)
      r += '\n' + CPF.format(CPF.generate(), e)
    n.value = r
  } else
    !(function r() {
      var o = CPF.format(CPF.generate(), 'digits'),
        m = (o + '').charAt(8)
      if (m == t && 1 == a) n.value = CPF.format(o, e)
      else if (m == t && a > 1)
        for (var f = '', d = 0; d < a; ++d)
          !(function r() {
            var o = CPF.format(CPF.generate(), 'digits')
            ;(o + '').charAt(8) == t
              ? ((f += d < a - 1 ? CPF.format(o, e) + '\n' : CPF.format(o, e)),
                (n.value = f))
              : r()
          })()
      else r()
    })()
}
document.getElementById('btn-validar-CPF').onclick = function () {
  for (
    var e = document.getElementById('cpf-gerado').value.split('\n'),
      t = '',
      n = 0;
    n < e.length;
    n++
  ) {
    var l = '❌'
    !0 === CPF.validate(e[n]) && (l = '✔'),
      n + 1 !== e.length
        ? (t += e[n] + ' - ' + l + '\n')
        : (t += e[n] + ' - ' + l),
      (document.getElementById('cpf-gerado').value = t)
  }
}
document.getElementById('btn-copiar').onclick = function () {
  document.getElementById('cpf-gerado').select(),
    document.execCommand('copy'),
    (document.getElementById('btn-copiar').innerText = 'Copiado!'),
    setTimeout(function () {
      document.getElementById('btn-copiar').innerText = 'Copiar'
    }, 1e3)
}
