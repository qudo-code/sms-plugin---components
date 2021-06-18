"use strict";

var t, e;

Object.defineProperty(exports, "__esModule", { value : !0 }), (function(t) {
    t.Start = "xstate.start", t.Stop = "xstate.stop", t.Raise = "xstate.raise", t.Send = "xstate.send", t.Cancel = "xstate.cancel", t.NullEvent = "", t.Assign = "xstate.assign", t.After = "xstate.after", t.DoneState = "done.state", t.DoneInvoke = "done.invoke", t.Log = "xstate.log", t.Init = "xstate.init", t.Invoke = "xstate.invoke", t.ErrorExecution = "error.execution", t.ErrorCommunication = "error.communication", t.ErrorPlatform = "error.platform", t.ErrorCustom = "xstate.error", t.Update = "xstate.update", t.Pure = "xstate.pure", t.Choose = "xstate.choose";
}(t || (t = {}))), (function(t) {
    t.Parent = "#_parent", t.Internal = "#_internal";
}(e || (e = {}))), t.Start, t.Stop, t.Raise, t.Send, t.Cancel, t.NullEvent; var n = t.Assign;

t.After, t.DoneState, t.Log, t.Init, t.Invoke, t.ErrorExecution, t.ErrorPlatform, t.ErrorCustom, t.Update, t.Choose, t.Pure; var i = function() {
    return (i = Object.assign || function(t) {
        for(var e, n = 1, i = arguments.length; n < i; n++) {
            for(var r in e = arguments[n]) {
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            }
        }

        return t;
    }).apply(this, arguments);
};

/* ! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function r(t, e) {
    var n = {};

    for(var i in t) {
        Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (n[i] = t[i]);
    }

    if(t != null && typeof Object.getOwnPropertySymbols === "function") {
        var r = 0;

        for(i = Object.getOwnPropertySymbols(t); r < i.length; r++) {
            e.indexOf(i[r]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[r]) && (n[i[r]] = t[i[r]]);
        }
    }

    return n;
}

function o(t) {
    var e = typeof Symbol === "function" && Symbol.iterator,
        n = e && t[e],
        i = 0;

    if(n) {
        return n.call(t);
    }

    if(t && typeof t.length === "number") {
        return { next() {
            return t && i >= t.length && (t = void 0), { value : t && t[i++], done : !t };
        } };
    }

    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function a(t, e) {
    var n = typeof Symbol === "function" && t[Symbol.iterator];

    if(!n) {
        return t;
    }

    var i, r,
        o = n.call(t),
        a = [];

    try {
        for(;(void 0 === e || e-- > 0) && !(i = o.next()).done;) {
            a.push(i.value);
        }
    } catch(t) {
        r = { error : t };
    } finally{
        try {
            i && !i.done && (n = o.return) && n.call(o);
        } finally{
            if(r) {
                throw r.error;
            }
        }
    }

    return a;
}

function s(t, e) {
    for(var n = 0, i = e.length, r = t.length; n < i; n++, r++) {
        t[r] = e[n];
    }

    return t;
}

var c = {},
    u = process.env.NODE_ENV === "production";

function h(t) {
    return Object.keys(t);
}

function f(t, e, n) {
    void 0 === n && (n = "."); var i = v(t, n),
        r = v(e, n);

    return C(r) ? Boolean(C(i)) && r === i : C(i) ? i in r : h(i).every(((t) => t in r && f(i[t], r[t])));
}

function l(t) {
    try {
        return C(t) || typeof t === "number" ? `${t}` : t.type;
    } catch(t) {
        throw new Error("Events must be strings or objects with a string event.type property.");
    }
}

function d(t, e) {
    try {
        return T(t) ? t : t.toString().split(e);
    } catch(e) {
        throw new Error(`'${t}' is not a valid state path.`);
    }
}

function v(t, e) {
    return typeof(n = t) === "object" && "value" in n && "context" in n && "event" in n && "_event" in n ? t.value : T(t) ? p(t) : typeof t !== "string" ? t : p(d(t, e)); var n;
}

function p(t) {
    if(t.length === 1) {
        return t[0];
    }

    for(var e = {}, n = e, i = 0; i < t.length - 1; i++) {
        i === t.length - 2 ? n[t[i]] = t[i + 1] : (n[t[i]] = {}, n = n[t[i]]);
    }

    return e;
}

function y(t, e) {
    for(var n = {}, i = h(t), r = 0; r < i.length; r++) {
        var o = i[r];

        n[o] = e(t[o], o, t, r);
    }

    return n;
}

function g(t, e, n) {
    var i, r,
        a = {};

    try {
        for(var s = o(h(t)), c = s.next(); !c.done; c = s.next()) {
            var u = c.value,
                f = t[u];

            n(f) && (a[u] = e(f, u, t));
        }
    } catch(t) {
        i = { error : t };
    } finally{
        try {
            c && !c.done && (r = s.return) && r.call(s);
        } finally{
            if(i) {
                throw i.error;
            }
        }
    }

    return a;
}

var m = function(t) {
    return function(e) {
        var n, i,
            r = e;

        try {
            for(var a = o(t), s = a.next(); !s.done; s = a.next()) {
                r = r[s.value];
            }
        } catch(t) {
            n = { error : t };
        } finally{
            try {
                s && !s.done && (i = a.return) && i.call(a);
            } finally{
                if(n) {
                    throw n.error;
                }
            }
        }

        return r;
    };
};

function x(t) {
    return t ? C(t) ? [[ t ]] : S(h(t).map(((e) => {
        var n = t[e];

        return typeof n === "string" || n && Object.keys(n).length ? x(t[e]).map(((t) => [ e ].concat(t))) : [[ e ]];
    }))) : [[]];
}

function S(t) {
    var e;

    return (e = []).concat.apply(e, s([], a(t)));
}

function w(t) {
    return T(t) ? t : [ t ];
}

function b(t) {
    return void 0 === t ? [] : w(t);
}

function E(t, e, n) {
    var i, r;

    if(P(t)) {
        return t(e, n.data);
    }

    var a = {};

    try {
        for(var s = o(Object.keys(t)), c = s.next(); !c.done; c = s.next()) {
            var u = c.value,
                h = t[u];

            P(h) ? a[u] = h(e, n.data) : a[u] = h;
        }
    } catch(t) {
        i = { error : t };
    } finally{
        try {
            c && !c.done && (r = s.return) && r.call(s);
        } finally{
            if(i) {
                throw i.error;
            }
        }
    }

    return a;
}

function _(t) {
    return t instanceof Promise || !(t === null || !P(t) && typeof t !== "object" || !P(t.then));
}

function N(t, e) {
    var n, i,
        r = a([[], []], 2),
        s = r[0],
        c = r[1];

    try {
        for(var u = o(t), h = u.next(); !h.done; h = u.next()) {
            var f = h.value;

            e(f) ? s.push(f) : c.push(f);
        }
    } catch(t) {
        n = { error : t };
    } finally{
        try {
            h && !h.done && (i = u.return) && i.call(u);
        } finally{
            if(n) {
                throw n.error;
            }
        }
    }

    return [ s, c ];
}

function O(t, e) {
    return y(t.states, ((t, n) => {
        if(t) {
            var i = (C(e) ? void 0 : e[n]) || (t ? t.current : void 0);

            if(i) {
                return { current : i, states : O(t, i) };
            }
        }
    }));
}

var k = function() {};

function T(t) {
    return Array.isArray(t);
}

function P(t) {
    return typeof t === "function";
}

function C(t) {
    return typeof t === "string";
}

function j(t, e) {
    if(t) {
        return C(t) ? {
            type : "xstate.guard", name : t, predicate : e ? e[t] : void 0,
        } : P(t) ? {
            type : "xstate.guard", name : t.name, predicate : t,
        } : t;
    }
}

function I(t) {
    try {
        return "subscribe" in t && P(t.subscribe);
    } catch(t) {
        return !1;
    }
}

u || (k = function(t, e) {
    var n = t instanceof Error ? t : void 0;

    if((n || !t) && void 0 !== console) {
        var i = [ `Warning: ${e}` ];

        n && i.push(n), console.warn.apply(console, i);
    }
}); var D, V,
    L = typeof Symbol === "function" && Symbol.observable || "@@observable";

function A(t) {
    try {
        return "__xstatenode" in t;
    } catch(t) {
        return !1;
    }
}

function M(t, e) {
    return C(t) || typeof t === "number" ? i({ type : t }, e) : t;
}

function R(t, e) {
    if(!C(t) && "$$type" in t && t.$$type === "scxml") {
        return t;
    }

    var n = M(t);

    return i({
        name : n.type, data : n, $$type : "scxml", type : "external",
    }, e);
}

function z(t, e) {
    return w(e).map(((e) => (void 0 === e || typeof e === "string" || A(e) ? { target : e, event : t } : i(i({}, e), { event : t }))));
}

function J(t, e, n, i, r) {
    var o = t.options.guards,
        a = {
            state : r, cond : e, _event : i,
        };

    if(e.type === "xstate.guard") {
        return e.predicate(n, i.data, a);
    }

    var s = o[e.type];

    if(!s) {
        throw new Error(`Guard '${e.type}' is not implemented on machine '${t.id}'.`);
    }

    return s(n, i.data, a);
}

function U(t) {
    return typeof t === "string" ? { type : t } : t;
}

!(function(t) {
    t.Start = "xstate.start", t.Stop = "xstate.stop", t.Raise = "xstate.raise", t.Send = "xstate.send", t.Cancel = "xstate.cancel", t.NullEvent = "", t.Assign = "xstate.assign", t.After = "xstate.after", t.DoneState = "done.state", t.DoneInvoke = "done.invoke", t.Log = "xstate.log", t.Init = "xstate.init", t.Invoke = "xstate.invoke", t.ErrorExecution = "error.execution", t.ErrorCommunication = "error.communication", t.ErrorPlatform = "error.platform", t.ErrorCustom = "xstate.error", t.Update = "xstate.update", t.Pure = "xstate.pure", t.Choose = "xstate.choose";
}(D || (D = {}))), (function(t) {
    t.Parent = "#_parent", t.Internal = "#_internal";
}(V || (V = {}))); var F = D.Start,
    B = D.Stop,
    q = D.Raise,
    $ = D.Send,
    X = D.Cancel,
    H = D.NullEvent,
    G = D.Assign;

D.After, D.DoneState; var W = D.Log,
    K = D.Init,
    Q = D.Invoke;

D.ErrorExecution; var Y = D.ErrorPlatform,
    Z = D.ErrorCustom,
    tt = D.Update,
    et = D.Choose,
    nt = D.Pure,
    it = R({ type : K });

function rt(t, e) {
    return e && e[t] || void 0;
}

function ot(t, e) {
    var n;

    if(C(t) || typeof t === "number") {
        var r = rt(t, e);

        n = P(r) ? { type : t, exec : r } : r || { type : t, exec : void 0 };
    } else if(P(t)) {
        n = { type : t.name || t.toString(), exec : t };
    } else if(P(r = rt(t.type, e))) {
        n = i(i({}, t), { exec : r });
    } else if(r) {
        var o = r.type || t.type;

        n = i(i(i({}, r), t), { type : o });
    } else {
        n = t;
    }

    return Object.defineProperty(n, "toString", {
        value() {
            return n.type;
        }, enumerable : !1, configurable : !0,
    }), n;
}

var at = function(t, e) {
    return t ? (T(t) ? t : [ t ]).map(((t) => ot(t, e))) : [];
};

function st(t) {
    var e = ot(t);

    return i(i({ id : C(t) ? t : e.id }, e), { type : e.type });
}

function ct(t) {
    return C(t) ? { type : q, event : t } : ut(t, { to : V.Internal });
}

function ut(t, e) {
    return {
        to : e ? e.to : void 0, type : $, event : P(t) ? t : M(t), delay : e ? e.delay : void 0, id : e && void 0 !== e.id ? e.id : P(t) ? t.name : l(t),
    };
}

function ht(t, e) {
    var n = `${D.DoneState}.${t}`;

    return {
        type : n, data : e, toString() {
            return n;
        },
    };
}

function ft(t, e) {
    var n = `${D.DoneInvoke}.${t}`;

    return {
        type : n, data : e, toString() {
            return n;
        },
    };
}

function lt(t, e) {
    var n = `${D.ErrorPlatform}.${t}`;

    return {
        type : n, data : e, toString() {
            return n;
        },
    };
}

function dt(t, e, n, r, s) {
    var c = a(N(s, ((t) => t.type === G)), 2),
        f = c[0],
        l = c[1],
        d = f.length ? (function(t, e, n, i) {
            return u || k(Boolean(t), "Attempting to update undefined context"), t ? n.reduce(((t, n) => {
                var r, a,
                    s = n.assignment,
                    c = {
                        state : i, action : n, _event : e,
                    },
                    u = {};

                if(P(s)) {
                    u = s(t, e.data, c);
                } else {
                    try {
                        for(var f = o(h(s)), l = f.next(); !l.done; l = f.next()) {
                            var d = l.value,
                                v = s[d];

                            u[d] = P(v) ? v(t, e.data, c) : v;
                        }
                    } catch(t) {
                        r = { error : t };
                    } finally{
                        try {
                            l && !l.done && (a = f.return) && a.call(f);
                        } finally{
                            if(r) {
                                throw r.error;
                            }
                        }
                    }
                }

                return Object.assign({}, t, u);
            }), t) : t;
        }(n, r, f, e)) : n;

    return [ S(l.map(((n) => {
        var o;

        switch(n.type) {
        case q:return { type : q, _event : R(n.event) }; case $:var a = (function(t, e, n, r) {
            var o,
                a = { _event : n },
                s = R(P(t.event) ? t.event(e, n.data, a) : t.event);

            if(C(t.delay)) {
                var c = r && r[t.delay];

                o = P(c) ? c(e, n.data, a) : c;
            } else {
                o = P(t.delay) ? t.delay(e, n.data, a) : t.delay;
            }

            var u = P(t.to) ? t.to(e, n.data, a) : t.to;

            return i(i({}, t), {
                to : u, _event : s, event : s.data, delay : o,
            });
        }(n, d, r, t.options.delays));

            return u || k(!C(n.delay) || typeof a.delay === "number", `No delay reference for delay expression '${n.delay}' was found on machine '${t.id}'`), a; case W:return (function(t, e, n) {
            return i(i({}, t), { value : C(t.expr) ? t.expr : t.expr(e, n.data, { _event : n }) });
        }(n, d, r)); case et:if(!(c = (o = n.conds.find(((n) => {
            var i = j(n.cond, t.options.guards);

            return !i || J(t, i, d, r, e);
        }))) === null || void 0 === o ? void 0 : o.actions)) {
            return [];
        }

            var s = dt(t, e, d, r, at(b(c), t.options.actions));

            return d = s[1], s[0]; case nt:var c;

            return (c = n.get(d, r.data)) ? (s = dt(t, e, d, r, at(b(c), t.options.actions)), d = s[1], s[0]) : []; case B:return (function(t, e, n) {
            var i = P(t.activity) ? t.activity(e, n.data) : t.activity,
                r = typeof i === "string" ? { id : i } : i;

            return { type : D.Stop, activity : r };
        }(n, d, r)); default:return ot(n, t.options.actions);
        }
    }))), d ];
}

var vt = function(t) {
    return t.type === "atomic" || t.type === "final";
};

function pt(t) {
    return h(t.states).map(((e) => t.states[e]));
}

function yt(t) {
    var e = [ t ];

    return vt(t) ? e : e.concat(S(pt(t).map(yt)));
}

function gt(t, e) {
    var n, i, r, a, s, c, u, h,
        f = xt(new Set(t)),
        l = new Set(e);

    try {
        for(var d = o(l), v = d.next(); !v.done; v = d.next()) {
            for(var p = (_ = v.value).parent; p && !l.has(p);) {
                l.add(p), p = p.parent;
            }
        }
    } catch(t) {
        n = { error : t };
    } finally{
        try {
            v && !v.done && (i = d.return) && i.call(d);
        } finally{
            if(n) {
                throw n.error;
            }
        }
    }

    var y = xt(l);

    try {
        for(var g = o(l), m = g.next(); !m.done; m = g.next()) {
            if((_ = m.value).type !== "compound" || y.get(_) && y.get(_).length) {
                if(_.type === "parallel") {
                    try {
                        for(var x = (s = void 0, o(pt(_))), S = x.next(); !S.done; S = x.next()) {
                            var w = S.value;

                            w.type !== "history" && (l.has(w) || (l.add(w), f.get(w) ? f.get(w).forEach(((t) => l.add(t))) : w.initialStateNodes.forEach(((t) => l.add(t)))));
                        }
                    } catch(t) {
                        s = { error : t };
                    } finally{
                        try {
                            S && !S.done && (c = x.return) && c.call(x);
                        } finally{
                            if(s) {
                                throw s.error;
                            }
                        }
                    }
                }
            } else {
                f.get(_) ? f.get(_).forEach(((t) => l.add(t))) : _.initialStateNodes.forEach(((t) => l.add(t)));
            }
        }
    } catch(t) {
        r = { error : t };
    } finally{
        try {
            m && !m.done && (a = g.return) && a.call(g);
        } finally{
            if(r) {
                throw r.error;
            }
        }
    }

    try {
        for(var b = o(l), E = b.next(); !E.done; E = b.next()) {
            var _;

            for(p = (_ = E.value).parent; p && !l.has(p);) {
                l.add(p), p = p.parent;
            }
        }
    } catch(t) {
        u = { error : t };
    } finally{
        try {
            E && !E.done && (h = b.return) && h.call(b);
        } finally{
            if(u) {
                throw u.error;
            }
        }
    }

    return l;
}

function mt(t, e) {
    var n = e.get(t);

    if(!n) {
        return {};
    }

    if(t.type === "compound") {
        var i = n[0];

        if(!i) {
            return {};
        }

        if(vt(i)) {
            return i.key;
        }
    }

    var r = {};

    return n.forEach(((t) => {
        r[t.key] = mt(t, e);
    })), r;
}

function xt(t) {
    var e, n,
        i = new Map();

    try {
        for(var r = o(t), a = r.next(); !a.done; a = r.next()) {
            var s = a.value;

            i.has(s) || i.set(s, []), s.parent && (i.has(s.parent) || i.set(s.parent, []), i.get(s.parent).push(s));
        }
    } catch(t) {
        e = { error : t };
    } finally{
        try {
            a && !a.done && (n = r.return) && n.call(r);
        } finally{
            if(e) {
                throw e.error;
            }
        }
    }

    return i;
}

function St(t, e) {
    return mt(t, xt(gt([ t ], e)));
}

function wt(t, e) {
    return Array.isArray(t) ? t.some(((t) => t === e)) : t instanceof Set && t.has(e);
}

function bt(t, e) {
    return e.type === "compound" ? pt(e).some(((e) => e.type === "final" && wt(t, e))) : e.type === "parallel" && pt(e).every(((e) => bt(t, e)));
}

function Et(t, e) {
    if(t === e) {
        return !0;
    }

    if(void 0 === t || void 0 === e) {
        return !1;
    }

    if(C(t) || C(e)) {
        return t === e;
    }

    var n = h(t),
        i = h(e);

    return n.length === i.length && n.every(((n) => Et(t[n], e[n])));
}

var _t = (function() {
        function t(t) {
            var e,
                n = this;

            this.actions = [], this.activities = c, this.meta = {}, this.events = [], this.value = t.value, this.context = t.context, this._event = t._event, this._sessionid = t._sessionid, this.event = this._event.data, this.historyValue = t.historyValue, this.history = t.history, this.actions = t.actions || [], this.activities = t.activities || c, this.meta = t.meta || {}, this.events = t.events || [], this.matches = this.matches.bind(this), this.toStrings = this.toStrings.bind(this), this.configuration = t.configuration, this.transitions = t.transitions, this.children = t.children, this.done = Boolean(t.done), this.tags = (e = t.tags) !== null && void 0 !== e ? e : new Set(), Object.defineProperty(this, "nextEvents", { get() {
                return t = n.configuration, s([], a(new Set(S(s([], a(t.map(((t) => t.ownEvents)))))))); var t;
            } });
        }

        return t.from = function(e, n) {
            return e instanceof t ? e.context !== n ? new t({
                value : e.value, context : n, _event : e._event, _sessionid : null, historyValue : e.historyValue, history : e.history, actions : [], activities : e.activities, meta : {}, events : [], configuration : [], transitions : [], children : {},
            }) : e : new t({
                value : e, context : n, _event : it, _sessionid : null, historyValue : void 0, history : void 0, actions : [], activities : void 0, meta : void 0, events : [], configuration : [], transitions : [], children : {},
            });
        }, t.create = function(e) {
            return new t(e);
        }, t.inert = function(e, n) {
            if(e instanceof t) {
                if(!e.actions.length) {
                    return e;
                }

                var i = it;

                return new t({
                    value : e.value, context : n, _event : i, _sessionid : null, historyValue : e.historyValue, history : e.history, activities : e.activities, configuration : e.configuration, transitions : [], children : {},
                });
            }

            return t.from(e, n);
        }, t.prototype.toStrings = function(t, e) {
            var n = this;

            if(void 0 === t && (t = this.value), void 0 === e && (e = "."), C(t)) {
                return [ t ];
            }

            var i = h(t);

            return i.concat.apply(i, s([], a(i.map(((i) => n.toStrings(t[i], e).map(((t) => i + e + t)))))));
        }, t.prototype.toJSON = function() {
            var t = this;

            t.configuration, t.transitions; var e = t.tags,
                n = r(t, [ "configuration", "transitions", "tags" ]);

            return i(i({}, n), { tags : Array.from(e) });
        }, t.prototype.matches = function(t) {
            return f(t, this.value);
        }, t.prototype.hasTag = function(t) {
            return this.tags.has(t);
        }, t;
    }()),
    Nt = function(t, e) {
        return e(t);
    };

function Ot(t) {
    return {
        id : t, send() {}, subscribe() {
            return { unsubscribe() {} };
        }, getSnapshot() {}, toJSON() {
            return { id : t };
        },
    };
}

function kt(t, e, n, i) {
    var r,
        o = U(t.src),
        a = (r = e == null ? void 0 : e.options.services) === null || void 0 === r ? void 0 : r[o.type],
        s = t.data ? E(t.data, n, i) : void 0,
        c = a ? (function(t, e, n) {
            var i = Ot(e);

            return i.deferred = !0, A(t) && (i.state = Nt(void 0, (() => (n ? t.withContext(n) : t).initialState))), i;
        }(a, t.id, s)) : Ot(t.id);

    return c.meta = t, c;
}

function Tt(t) {
    return typeof t === "string" ? { type : t, toString() {
        return t;
    } } : t;
}

function Pt(t) {
    return i(i({ type : Q }, t), { toJSON() {
        t.onDone, t.onError; var e = r(t, [ "onDone", "onError" ]);

        return i(i({}, e), { type : Q, src : Tt(t.src) });
    } });
}

var Ct = {},
    jt = function(t) {
        return t[0] === "#";
    };

!(function() {
    function t(e, n, r) {
        var c,
            f = this;

        void 0 === r && (r = void 0), this.config = e, this.context = r, this.order = -1, this.__xstatenode = !0, this.__cache = {
            events : void 0, relativeValue : new Map(), initialStateValue : void 0, initialState : void 0, on : void 0, transitions : void 0, candidates : {}, delayedTransitions : void 0,
        }, this.idMap = {}, this.tags = [], this.options = Object.assign({
            actions : {}, guards : {}, services : {}, activities : {}, delays : {},
        }, n), this.parent = this.options._parent, this.key = this.config.key || this.options._key || this.config.id || "(machine)", this.machine = this.parent ? this.parent.machine : this, this.path = this.parent ? this.parent.path.concat(this.key) : [], this.delimiter = this.config.delimiter || (this.parent ? this.parent.delimiter : "."), this.id = this.config.id || s([ this.machine.key ], a(this.path)).join(this.delimiter), this.version = this.parent ? this.parent.version : this.config.version, this.type = this.config.type || (this.config.parallel ? "parallel" : this.config.states && h(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic"), this.schema = this.parent ? this.machine.schema : (c = this.config.schema) !== null && void 0 !== c ? c : {}, u || k(!("parallel" in this.config), `The "parallel" property is deprecated and will be removed in version 4.1. ${this.config.parallel ? "Replace with `type: 'parallel'`" : `Use \`type: '${this.type}'\``} in the config for state node '${this.id}' instead.`), this.initial = this.config.initial, this.states = this.config.states ? y(this.config.states, ((e, n) => {
            var r,
                o = new t(e, { _parent : f, _key : n });

            return Object.assign(f.idMap, i(((r = {})[o.id] = o, r), o.idMap)), o;
        })) : Ct; var l = 0;

        !(function t(e) {
            var n, i;

            e.order = l++; try {
                for(var r = o(pt(e)), a = r.next(); !a.done; a = r.next()) {
                    t(a.value);
                }
            } catch(t) {
                n = { error : t };
            } finally{
                try {
                    a && !a.done && (i = r.return) && i.call(r);
                } finally{
                    if(n) {
                        throw n.error;
                    }
                }
            }
        }(this)), this.history = !0 === this.config.history ? "shallow" : this.config.history || !1, this._transient = Boolean(this.config.always) || Boolean(this.config.on) && (Array.isArray(this.config.on) ? this.config.on.some(((t) => t.event === "")) : "" in this.config.on), this.strict = Boolean(this.config.strict), this.onEntry = b(this.config.entry || this.config.onEntry).map(((t) => ot(t))), this.onExit = b(this.config.exit || this.config.onExit).map(((t) => ot(t))), this.meta = this.config.meta, this.doneData = this.type === "final" ? this.config.data : void 0, this.invoke = b(this.config.invoke).map(((t, e) => {
            var n, r;

            if(A(t)) {
                return f.machine.options.services = i(((n = {})[t.id] = t, n), f.machine.options.services), Pt({ src : t.id, id : t.id });
            }

            if(C(t.src)) {
                return Pt(i(i({}, t), { id : t.id || t.src, src : t.src }));
            }

            if(A(t.src) || P(t.src)) {
                var o = `${f.id}:invocation[${e}]`;

                return f.machine.options.services = i(((r = {})[o] = t.src, r), f.machine.options.services), Pt(i(i({ id : o }, t), { src : o }));
            }

            var a = t.src;

            return Pt(i(i({ id : a.type }, t), { src : a }));
        })), this.activities = b(this.config.activities).concat(this.invoke)
            .map(((t) => st(t))), this.transition = this.transition.bind(this), this.tags = b(this.config.tags);
    }

    t.prototype._init = function() {
        this.__cache.transitions || yt(this).forEach(((t) => t.on));
    }, t.prototype.withConfig = function(e, n) {
        void 0 === n && (n = this.context); var r = this.options,
            o = r.actions,
            a = r.activities,
            s = r.guards,
            c = r.services,
            u = r.delays;

        return new t(this.config, {
            actions : i(i({}, o), e.actions), activities : i(i({}, a), e.activities), guards : i(i({}, s), e.guards), services : i(i({}, c), e.services), delays : i(i({}, u), e.delays),
        }, n);
    }, t.prototype.withContext = function(e) {
        return new t(this.config, this.options, e);
    }, Object.defineProperty(t.prototype, "definition", {
        get() {
            return {
                id : this.id, key : this.key, version : this.version, context : this.context, type : this.type, initial : this.initial, history : this.history, states : y(this.states, ((t) => t.definition)), on : this.on, transitions : this.transitions, entry : this.onEntry, exit : this.onExit, activities : this.activities || [], meta : this.meta, order : this.order || -1, data : this.doneData, invoke : this.invoke,
            };
        }, enumerable : !1, configurable : !0,
    }), t.prototype.toJSON = function() {
        return this.definition;
    }, Object.defineProperty(t.prototype, "on", {
        get() {
            if(this.__cache.on) {
                return this.__cache.on;
            }

            var t = this.transitions;

            return this.__cache.on = t.reduce(((t, e) => (t[e.eventType] = t[e.eventType] || [], t[e.eventType].push(e), t)), {});
        }, enumerable : !1, configurable : !0,
    }), Object.defineProperty(t.prototype, "after", {
        get() {
            return this.__cache.delayedTransitions || (this.__cache.delayedTransitions = this.getDelayedTransitions(), this.__cache.delayedTransitions);
        }, enumerable : !1, configurable : !0,
    }), Object.defineProperty(t.prototype, "transitions", {
        get() {
            return this.__cache.transitions || (this.__cache.transitions = this.formatTransitions(), this.__cache.transitions);
        }, enumerable : !1, configurable : !0,
    }), t.prototype.getCandidates = function(t) {
        if(this.__cache.candidates[t]) {
            return this.__cache.candidates[t];
        }

        var e = t === "",
            n = this.transitions.filter(((n) => {
                var i = n.eventType === t;

                return e ? i : i || n.eventType === "*";
            }));

        return this.__cache.candidates[t] = n, n;
    }, t.prototype.getDelayedTransitions = function() {
        var t = this,
            e = this.config.after;

        if(!e) {
            return [];
        }

        var n = function(e, n) {
            var i = (function(t, e) {
                var n = e ? `#${e}` : "";

                return `${D.After}(${t})${n}`;
            }(P(e) ? `${t.id}:delay[${n}]` : e, t.id));

            return t.onEntry.push(ut(i, { delay : e })), t.onExit.push({ type : X, sendId : i }), i;
        };

        return (T(e) ? e.map(((t, e) => {
            var r = n(t.delay, e);

            return i(i({}, t), { event : r });
        })) : S(h(e).map(((t, r) => {
            var o = e[t],
                a = C(o) ? { target : o } : o,
                s = isNaN(Number(t)) ? t : Number(t),
                c = n(s, r);

            return b(a).map(((t) => i(i({}, t), { event : c, delay : s })));
        })))).map(((e) => {
            var n = e.delay;

            return i(i({}, t.formatTransition(e)), { delay : n });
        }));
    }, t.prototype.getStateNodes = function(t) {
        var e,
            n = this;

        if(!t) {
            return [];
        }

        var i = t instanceof _t ? t.value : v(t, this.delimiter);

        if(C(i)) {
            var r = this.getStateNode(i).initial;

            return void 0 !== r ? this.getStateNodes(((e = {})[i] = r, e)) : [ this, this.states[i] ];
        }

        var o = h(i),
            a = o.map(((t) => n.getStateNode(t)));

        return a.push(this), a.concat(o.reduce(((t, e) => {
            var r = n.getStateNode(e).getStateNodes(i[e]);

            return t.concat(r);
        }), []));
    }, t.prototype.handles = function(t) {
        var e = l(t);

        return this.events.includes(e);
    }, t.prototype.resolveState = function(t) {
        var e = Array.from(gt([], this.getStateNodes(t.value)));

        return new _t(i(i({}, t), {
            value : this.resolve(t.value), configuration : e, done : bt(e, this),
        }));
    }, t.prototype.transitionLeafNode = function(t, e, n) {
        var i = this.getStateNode(t).next(e, n);

        return i && i.transitions.length ? i : this.next(e, n);
    }, t.prototype.transitionCompoundNode = function(t, e, n) {
        var i = h(t),
            r = this.getStateNode(i[0])._transition(t[i[0]], e, n);

        return r && r.transitions.length ? r : this.next(e, n);
    }, t.prototype.transitionParallelNode = function(t, e, n) {
        var i, r,
            a = {};

        try {
            for(var s = o(h(t)), c = s.next(); !c.done; c = s.next()) {
                var u = c.value,
                    f = t[u];

                if(f) {
                    var l = this.getStateNode(u)._transition(f, e, n);

                    l && (a[u] = l);
                }
            }
        } catch(t) {
            i = { error : t };
        } finally{
            try {
                c && !c.done && (r = s.return) && r.call(s);
            } finally{
                if(i) {
                    throw i.error;
                }
            }
        }

        var d = h(a).map(((t) => a[t])),
            v = S(d.map(((t) => t.transitions)));

        if(!d.some(((t) => t.transitions.length > 0))) {
            return this.next(e, n);
        }

        var p = S(d.map(((t) => t.entrySet))),
            y = S(h(a).map(((t) => a[t].configuration)));

        return {
            transitions : v, entrySet : p, exitSet : S(d.map(((t) => t.exitSet))), configuration : y, source : e, actions : S(h(a).map(((t) => a[t].actions))),
        };
    }, t.prototype._transition = function(t, e, n) {
        return C(t) ? this.transitionLeafNode(t, e, n) : h(t).length === 1 ? this.transitionCompoundNode(t, e, n) : this.transitionParallelNode(t, e, n);
    }, t.prototype.next = function(t, e) {
        var n, i, r,
            c = this,
            u = e.name,
            h = [],
            l = [];

        try {
            for(var d = o(this.getCandidates(u)), p = d.next(); !p.done; p = d.next()) {
                var y = p.value,
                    g = y.cond,
                    x = y.in,
                    w = t.context,
                    b = !x || (C(x) && jt(x) ? t.matches(v(this.getStateNodeById(x).path, this.delimiter)) : f(v(x, this.delimiter), m(this.path.slice(0, -2))(t.value))),
                    E = !1;

                try {
                    E = !g || J(this.machine, g, w, e, t);
                } catch(t) {
                    throw new Error(`Unable to evaluate guard '${g.name || g.type}' in transition for event '${u}' in state node '${this.id}':\n${t.message}`);
                }

                if(E && b) {
                    void 0 !== y.target && (l = y.target), h.push.apply(h, s([], a(y.actions))), r = y; break;
                }
            }
        } catch(t) {
            n = { error : t };
        } finally{
            try {
                p && !p.done && (i = d.return) && i.call(d);
            } finally{
                if(n) {
                    throw n.error;
                }
            }
        }

        if(r) {
            if(!l.length) {
                return {
                    transitions : [ r ], entrySet : [], exitSet : [], configuration : t.value ? [ this ] : [], source : t, actions : h,
                };
            }

            var _ = S(l.map(((e) => c.getRelativeStateNodes(e, t.historyValue)))),
                N = Boolean(r.internal);

            return {
                transitions : [ r ], entrySet : N ? [] : S(_.map(((t) => c.nodesFromChild(t)))), exitSet : N ? [] : [ this ], configuration : _, source : t, actions : h,
            };
        }
    }, t.prototype.nodesFromChild = function(t) {
        if(t.escapes(this)) {
            return [];
        }

        for(var e = [], n = t; n && n !== this;) {
            e.push(n), n = n.parent;
        }

        return e.push(this), e;
    }, t.prototype.escapes = function(t) {
        if(this === t) {
            return !1;
        }

        for(var e = this.parent; e;) {
            if(e === t) {
                return !1;
            }

            e = e.parent;
        }

        return !0;
    }, t.prototype.getActions = function(t, e, n, i) {
        var r, c, u, h,
            f = gt([], i ? this.getStateNodes(i.value) : [ this ]),
            l = t.configuration.length ? gt(f, t.configuration) : f;

        try {
            for(var d = o(l), v = d.next(); !v.done; v = d.next()) {
                wt(f, g = v.value) || t.entrySet.push(g);
            }
        } catch(t) {
            r = { error : t };
        } finally{
            try {
                v && !v.done && (c = d.return) && c.call(d);
            } finally{
                if(r) {
                    throw r.error;
                }
            }
        }

        try {
            for(var p = o(f), y = p.next(); !y.done; y = p.next()) {
                var g;

                wt(l, g = y.value) && !wt(t.exitSet, g.parent) || t.exitSet.push(g);
            }
        } catch(t) {
            u = { error : t };
        } finally{
            try {
                y && !y.done && (h = p.return) && h.call(p);
            } finally{
                if(u) {
                    throw u.error;
                }
            }
        }

        t.source || (t.exitSet = [], t.entrySet.push(this)); var m = S(t.entrySet.map(((i) => {
            var r = [];

            if(i.type !== "final") {
                return r;
            }

            var o = i.parent;

            if(!o.parent) {
                return r;
            }

            r.push(ht(i.id, i.doneData), ht(o.id, i.doneData ? E(i.doneData, e, n) : void 0)); var a = o.parent;

            return a.type === "parallel" && pt(a).every(((e) => bt(t.configuration, e))) && r.push(ht(a.id)), r;
        })));

        t.exitSet.sort(((t, e) => e.order - t.order)), t.entrySet.sort(((t, e) => t.order - e.order)); var x = new Set(t.entrySet),
            w = new Set(t.exitSet),
            b = a([ S(Array.from(x).map(((t) => s(s([], a(t.activities.map(((t) => (function(t) {
                var e = st(t);

                return {
                    type : D.Start, activity : e, exec : void 0,
                };
            }(t)))))), a(t.onEntry))))).concat(m.map(ct)), S(Array.from(w).map(((t) => s(s([], a(t.onExit)), a(t.activities.map(((t) => (function(t) {
                var e = P(t) ? t : st(t);

                return {
                    type : D.Stop, activity : e, exec : void 0,
                };
            }(t))))))))) ], 2),
            _ = b[0],
            N = b[1];

        return at(N.concat(t.actions).concat(_), this.machine.options.actions);
    }, t.prototype.transition = function(t, e, n) {
        void 0 === t && (t = this.initialState); var i, r,
            o = R(e);

        if(t instanceof _t) {
            i = void 0 === n ? t : this.resolveState(_t.from(t, n));
        } else {
            var c = C(t) ? this.resolve(p(this.getResolvedPath(t))) : this.resolve(t),
                h = n || this.machine.context;

            i = this.resolveState(_t.from(c, h));
        }

        if(!u && o.name === "*") {
            throw new Error("An event cannot have the wildcard type ('*')");
        }

        if(this.strict && !this.events.includes(o.name) && (r = o.name, !/^(done|error)\./.test(r))) {
            throw new Error(`Machine '${this.id}' does not accept event '${o.name}'`);
        }

        var f = this._transition(i.value, i, o) || {
                transitions : [], configuration : [], entrySet : [], exitSet : [], source : i, actions : [],
            },
            l = gt([], this.getStateNodes(i.value)),
            d = f.configuration.length ? gt(l, f.configuration) : l;

        return f.configuration = s([], a(d)), this.resolveTransition(f, i, o);
    }, t.prototype.resolveRaisedTransition = function(t, e, n) {
        var i,
            r = t.actions;

        return (t = this.transition(t, e))._event = n, t.event = n.data, (i = t.actions).unshift.apply(i, s([], a(r))), t;
    }, t.prototype.resolveTransition = function(t, e, n, r) {
        var s, c,
            u = this;

        void 0 === n && (n = it), void 0 === r && (r = this.machine.context); var h = t.configuration,
            f = !e || t.transitions.length > 0 ? St(this.machine, h) : void 0,
            l = e ? e.historyValue ? e.historyValue : t.source ? this.machine.historyValue(e.value) : void 0 : void 0,
            d = e ? e.context : r,
            v = this.getActions(t, d, n, e),
            p = e ? i({}, e.activities) : {};

        try {
            for(var y = o(v), g = y.next(); !g.done; g = y.next()) {
                var m = g.value;

                m.type === F ? p[m.activity.id || m.activity.type] = m : m.type === B && (p[m.activity.id || m.activity.type] = !1);
            }
        } catch(t) {
            s = { error : t };
        } finally{
            try {
                g && !g.done && (c = y.return) && c.call(y);
            } finally{
                if(s) {
                    throw s.error;
                }
            }
        }

        var x, w,
            b = a(dt(this, e, d, n, v), 2),
            E = b[0],
            _ = b[1],
            k = a(N(E, ((t) => t.type === q || t.type === $ && t.to === V.Internal)), 2),
            T = k[0],
            P = k[1],
            C = E.filter(((t) => {
                var e;

                return t.type === F && ((e = t.activity) === null || void 0 === e ? void 0 : e.type) === Q;
            })).reduce(((t, e) => (t[e.activity.id] = kt(e.activity, u.machine, _, n), t)), e ? i({}, e.children) : {}),
            j = f ? t.configuration : e ? e.configuration : [],
            I = j.reduce(((t, e) => (void 0 !== e.meta && (t[e.id] = e.meta), t)), {}),
            D = bt(j, this),
            L = new _t({
                value : f || e.value, context : _, _event : n, _sessionid : e ? e._sessionid : null, historyValue : f ? l ? (x = l, w = f, { current : w, states : O(x, w) }) : void 0 : e ? e.historyValue : void 0, history : !f || t.source ? e : void 0, actions : f ? P : [], activities : f ? p : e ? e.activities : {}, meta : f ? I : e ? e.meta : void 0, events : [], configuration : j, transitions : t.transitions, children : C, done : D, tags : e == null ? void 0 : e.tags,
            }),
            A = d !== _;

        L.changed = n.name === tt || A; var M = L.history;

        if(M && delete M.history, !f) {
            return L;
        }

        var R = L;

        if(!D) {
            for((this._transient || h.some(((t) => t._transient))) && (R = this.resolveRaisedTransition(R, { type : H }, n)); T.length;) {
                var z = T.shift();

                R = this.resolveRaisedTransition(R, z._event, n);
            }
        }

        var J = R.changed || (M ? Boolean(R.actions.length) || A || typeof M.value !== typeof R.value || !Et(R.value, M.value) : void 0);

        return R.changed = J, R.history = M, R.tags = new Set(S(R.configuration.map(((t) => t.tags)))), R;
    }, t.prototype.getStateNode = function(t) {
        if(jt(t)) {
            return this.machine.getStateNodeById(t);
        }

        if(!this.states) {
            throw new Error(`Unable to retrieve child state '${t}' from '${this.id}'; no child states exist.`);
        }

        var e = this.states[t];

        if(!e) {
            throw new Error(`Child state '${t}' does not exist on '${this.id}'`);
        }

        return e;
    }, t.prototype.getStateNodeById = function(t) {
        var e = jt(t) ? t.slice("#".length) : t;

        if(e === this.id) {
            return this;
        }

        var n = this.machine.idMap[e];

        if(!n) {
            throw new Error(`Child state node '#${e}' does not exist on machine '${this.id}'`);
        }

        return n;
    }, t.prototype.getStateNodeByPath = function(t) {
        if(typeof t === "string" && jt(t)) {
            try {
                return this.getStateNodeById(t.slice(1));
            } catch(t) {}
        }

        for(var e = d(t, this.delimiter).slice(), n = this; e.length;) {
            var i = e.shift();

            if(!i.length) {
                break;
            }

            n = n.getStateNode(i);
        }

        return n;
    }, t.prototype.resolve = function(t) {
        var e,
            n = this;

        if(!t) {
            return this.initialStateValue || Ct;
        }

        switch(this.type) {
        case "parallel":return y(this.initialStateValue, ((e, i) => (e ? n.getStateNode(i).resolve(t[i] || e) : Ct))); case "compound":if(C(t)) {
            var i = this.getStateNode(t);

            return i.type === "parallel" || i.type === "compound" ? ((e = {})[t] = i.initialStateValue, e) : t;
        }

            return h(t).length ? y(t, ((t, e) => (t ? n.getStateNode(e).resolve(t) : Ct))) : this.initialStateValue || {}; default:return t || Ct;
        }
    }, t.prototype.getResolvedPath = function(t) {
        if(jt(t)) {
            var e = this.machine.idMap[t.slice("#".length)];

            if(!e) {
                throw new Error(`Unable to find state node '${t}'`);
            }

            return e.path;
        }

        return d(t, this.delimiter);
    }, Object.defineProperty(t.prototype, "initialStateValue", {
        get() {
            var t, e;

            if(this.__cache.initialStateValue) {
                return this.__cache.initialStateValue;
            }

            if(this.type === "parallel") {
                e = g(this.states, ((t) => t.initialStateValue || Ct), ((t) => !(t.type === "history")));
            } else if(void 0 !== this.initial) {
                if(!this.states[this.initial]) {
                    throw new Error(`Initial state '${this.initial}' not found on '${this.key}'`);
                }

                e = vt(this.states[this.initial]) ? this.initial : ((t = {})[this.initial] = this.states[this.initial].initialStateValue, t);
            } else {
                e = {};
            }

            return this.__cache.initialStateValue = e, this.__cache.initialStateValue;
        }, enumerable : !1, configurable : !0,
    }), t.prototype.getInitialState = function(t, e) {
        var n = this.getStateNodes(t);

        return this.resolveTransition({
            configuration : n, entrySet : n, exitSet : [], transitions : [], source : void 0, actions : [],
        }, void 0, void 0, e);
    }, Object.defineProperty(t.prototype, "initialState", {
        get() {
            this._init(); var t = this.initialStateValue;

            if(!t) {
                throw new Error(`Cannot retrieve initial state from simple state '${this.id}'.`);
            }

            return this.getInitialState(t);
        }, enumerable : !1, configurable : !0,
    }), Object.defineProperty(t.prototype, "target", {
        get() {
            var t;

            if(this.type === "history") {
                var e = this.config;

                t = C(e.target) && jt(e.target) ? p(this.machine.getStateNodeById(e.target).path.slice(this.path.length - 1)) : e.target;
            }

            return t;
        }, enumerable : !1, configurable : !0,
    }), t.prototype.getRelativeStateNodes = function(t, e, n) {
        return void 0 === n && (n = !0), n ? t.type === "history" ? t.resolveHistory(e) : t.initialStateNodes : [ t ];
    }, Object.defineProperty(t.prototype, "initialStateNodes", {
        get() {
            var t = this;

            return vt(this) ? [ this ] : this.type !== "compound" || this.initial ? S(x(this.initialStateValue).map(((e) => t.getFromRelativePath(e)))) : (u || k(!1, `Compound state node '${this.id}' has no initial state.`), [ this ]);
        }, enumerable : !1, configurable : !0,
    }), t.prototype.getFromRelativePath = function(t) {
        if(!t.length) {
            return [ this ];
        }

        var e = a(t),
            n = e[0],
            i = e.slice(1);

        if(!this.states) {
            throw new Error(`Cannot retrieve subPath '${n}' from node with no states`);
        }

        var r = this.getStateNode(n);

        if(r.type === "history") {
            return r.resolveHistory();
        }

        if(!this.states[n]) {
            throw new Error(`Child state '${n}' does not exist on '${this.id}'`);
        }

        return this.states[n].getFromRelativePath(i);
    }, t.prototype.historyValue = function(t) {
        if(h(this.states).length) {
            return { current : t || this.initialStateValue, states  : g(this.states, ((e, n) => {
                if(!t) {
                    return e.historyValue();
                }

                var i = C(t) ? void 0 : t[n];

                return e.historyValue(i || e.initialStateValue);
            }), ((t) => !t.history)) };
        }
    }, t.prototype.resolveHistory = function(t) {
        var e = this;

        if(this.type !== "history") {
            return [ this ];
        }

        var n = this.parent;

        if(!t) {
            var i = this.target;

            return i ? S(x(i).map(((t) => n.getFromRelativePath(t)))) : n.initialStateNodes;
        }

        var r,
            a = (r = n.path, "states", function(t) {
                var e, n,
                    i = t;

                try {
                    for(var a = o(r), s = a.next(); !s.done; s = a.next()) {
                        var c = s.value;

                        i = i.states[c];
                    }
                } catch(t) {
                    e = { error : t };
                } finally{
                    try {
                        s && !s.done && (n = a.return) && n.call(a);
                    } finally{
                        if(e) {
                            throw e.error;
                        }
                    }
                }

                return i;
            })(t).current;

        return C(a) ? [ n.getStateNode(a) ] : S(x(a).map(((t) => (e.history === "deep" ? n.getFromRelativePath(t) : [ n.states[t[0]] ]))));
    }, Object.defineProperty(t.prototype, "stateIds", {
        get() {
            var t = this,
                e = S(h(this.states).map(((e) => t.states[e].stateIds)));

            return [ this.id ].concat(e);
        }, enumerable : !1, configurable : !0,
    }), Object.defineProperty(t.prototype, "events", {
        get() {
            var t, e, n, i;

            if(this.__cache.events) {
                return this.__cache.events;
            }

            var r = this.states,
                a = new Set(this.ownEvents);

            if(r) {
                try {
                    for(var s = o(h(r)), c = s.next(); !c.done; c = s.next()) {
                        var u = r[c.value];

                        if(u.states) {
                            try {
                                for(var f = (n = void 0, o(u.events)), l = f.next(); !l.done; l = f.next()) {
                                    var d = l.value;

                                    a.add(`${d}`);
                                }
                            } catch(t) {
                                n = { error : t };
                            } finally{
                                try {
                                    l && !l.done && (i = f.return) && i.call(f);
                                } finally{
                                    if(n) {
                                        throw n.error;
                                    }
                                }
                            }
                        }
                    }
                } catch(e) {
                    t = { error : e };
                } finally{
                    try {
                        c && !c.done && (e = s.return) && e.call(s);
                    } finally{
                        if(t) {
                            throw t.error;
                        }
                    }
                }
            }

            return this.__cache.events = Array.from(a);
        }, enumerable : !1, configurable : !0,
    }), Object.defineProperty(t.prototype, "ownEvents", {
        get() {
            var t = new Set(this.transitions.filter(((t) => !(!t.target && !t.actions.length && t.internal))).map(((t) => t.eventType)));

            return Array.from(t);
        }, enumerable : !1, configurable : !0,
    }), t.prototype.resolveTarget = function(t) {
        var e = this;

        if(void 0 !== t) {
            return t.map(((t) => {
                if(!C(t)) {
                    return t;
                }

                var n = t[0] === e.delimiter;

                if(n && !e.parent) {
                    return e.getStateNodeByPath(t.slice(1));
                }

                var i = n ? e.key + t : t;

                if(!e.parent) {
                    return e.getStateNodeByPath(i);
                }

                try {
                    return e.parent.getStateNodeByPath(i);
                } catch(t) {
                    throw new Error(`Invalid transition definition for state node '${e.id}':\n${t.message}`);
                }
            }));
        }
    }, t.prototype.formatTransition = function(t) {
        var e = this,
            n = (function(t) {
                if(void 0 !== t && t !== "") {
                    return b(t);
                }
            }(t.target)),
            r = "internal" in t ? t.internal : !n || n.some(((t) => C(t) && t[0] === e.delimiter)),
            o = this.machine.options.guards,
            a = this.resolveTarget(n),
            s = i(i({}, t), {
                actions : at(b(t.actions)), cond : j(t.cond, o), target : a, source : this, internal : r, eventType : t.event, toJSON() {
                    return i(i({}, s), { target : s.target ? s.target.map(((t) => `#${t.id}`)) : void 0, source : `#${e.id}` });
                },
            });

        return s;
    }, t.prototype.formatTransitions = function() {
        var t, e, n,
            i = this;

        if(this.config.on) {
            if(Array.isArray(this.config.on)) {
                n = this.config.on;
            } else {
                var c = this.config.on,
                    f = c["*"],
                    l = void 0 === f ? [] : f,
                    d = r(c, [ "*" ]);

                n = S(h(d).map(((t) => {
                    u || t !== "" || k(!1, `Empty string transition configs (e.g., \`{ on: { '': ... }}\`) for transient transitions are deprecated. Specify the transition in the \`{ always: ... }\` property instead. Please check the \`on\` configuration for "#${i.id}".`); var e = z(t, d[t]);

                    return u || (function(t, e, n) {
                        var i = n.slice(0, -1).some(((t) => !("cond" in t) && !("in" in t) && (C(t.target) || A(t.target))));

                        k(!i, `One or more transitions for ${e === "" ? "the transient event" : `event '${e}'`} on state '${t.id}' are unreachable. Make sure that the default transition is the last one defined.`);
                    }(i, t, e)), e;
                }))
                    .concat(z("*", l)));
            }
        } else {
            n = [];
        }

        var v = this.config.always ? z("", this.config.always) : [],
            p = this.config.onDone ? z(String(ht(this.id)), this.config.onDone) : [];

        u || k(!(this.config.onDone && !this.parent), `Root nodes cannot have an ".onDone" transition. Please check the config of "${this.id}".`); var y = S(this.invoke.map(((t) => {
                var e = [];

                return t.onDone && e.push.apply(e, s([], a(z(String(ft(t.id)), t.onDone)))), t.onError && e.push.apply(e, s([], a(z(String(lt(t.id)), t.onError)))), e;
            }))),
            g = this.after,
            m = S(s(s(s(s([], a(p)), a(y)), a(n)), a(v)).map(((t) => b(t).map(((t) => i.formatTransition(t))))));

        try {
            for(var x = o(g), w = x.next(); !w.done; w = x.next()) {
                var E = w.value;

                m.push(E);
            }
        } catch(e) {
            t = { error : e };
        } finally{
            try {
                w && !w.done && (e = x.return) && e.call(x);
            } finally{
                if(t) {
                    throw t.error;
                }
            }
        }

        return m;
    };
}());

var It = { deferEvents : !1 },
    Dt = (function() {
        function t(t) {
            this.processingEvent = !1, this.queue = [], this.initialized = !1, this.options = i(i({}, It), t);
        }

        return t.prototype.initialize = function(t) {
            if(this.initialized = !0, t) {
                if(!this.options.deferEvents) {
                    return void this.schedule(t);
                }

                this.process(t);
            }

            this.flushEvents();
        }, t.prototype.schedule = function(t) {
            if(this.initialized && !this.processingEvent) {
                if(this.queue.length !== 0) {
                    throw new Error("Event queue should be empty when it is not processing events");
                }

                this.process(t), this.flushEvents();
            } else {
                this.queue.push(t);
            }
        }, t.prototype.clear = function() {
            this.queue = [];
        }, t.prototype.flushEvents = function() {
            for(var t = this.queue.shift(); t;) {
                this.process(t), t = this.queue.shift();
            }
        }, t.prototype.process = function(t) {
            this.processingEvent = !0; try {
                t();
            } catch(t) {
                throw this.clear(), t;
            } finally{
                this.processingEvent = !1;
            }
        }, t;
    }()),
    Vt = new Map(),
    Lt = 0;

function At() {
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : void 0;
}

var Mt,
    Rt = { sync : !1, autoForward : !1 };

!(function(t) {
    t[t.NotStarted = 0] = "NotStarted", t[t.Running = 1] = "Running", t[t.Stopped = 2] = "Stopped";
}(Mt || (Mt = {})));

var zt = (function() {
    function t(e, n) {
        var r = this;

        void 0 === n && (n = t.defaultOptions), this.machine = e, this.scheduler = new Dt(), this.delayedEventsMap = {}, this.listeners = new Set(), this.contextListeners = new Set(), this.stopListeners = new Set(), this.doneListeners = new Set(), this.eventListeners = new Set(), this.sendListeners = new Set(), this.initialized = !1, this.status = Mt.NotStarted, this.children = new Map(), this.forwardTo = new Set(), this.init = this.start, this.send = function(t, e) {
            if(T(t)) {
                return r.batch(t), r.state;
            }

            var n = R(M(t, e));

            if(r.status === Mt.Stopped) {
                return u || k(!1, `Event "${n.name}" was sent to stopped service "${r.machine.id}". This service has already reached its final state, and will not transition.\nEvent: ${JSON.stringify(n.data)}`), r.state;
            }

            if(r.status !== Mt.Running && !r.options.deferEvents) {
                throw new Error(`Event "${n.name}" was sent to uninitialized service "${r.machine.id}". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: ${JSON.stringify(n.data)}`);
            }

            return r.scheduler.schedule((() => {
                r.forward(n); var t = r.nextState(n);

                r.update(t, n);
            })), r._state;
        }, this.sendTo = function(t, e) {
            var n,
                o = r.parent && (e === V.Parent || r.parent.id === e),
                a = o ? r.parent : C(e) ? r.children.get(e) || (function(t) {
                    return Vt.get(t);
                }(e)) : (n = e) && typeof n.send === "function" ? e : void 0;

            if(a) {
                "machine" in a ? a.send(i(i({}, t), { name : t.name === Z ? `${lt(r.id)}` : t.name, origin : r.sessionId })) : a.send(t.data);
            } else {
                if(!o) {
                    throw new Error(`Unable to send event to child '${e}' from service '${r.id}'.`);
                }

                u || k(!1, `Service '${r.id}' has no parent: unable to send event ${t.type}`);
            }
        };

        var o = i(i({}, t.defaultOptions), n),
            a = o.clock,
            s = o.logger,
            c = o.parent,
            h = o.id,
            f = void 0 !== h ? h : e.id;

        this.id = f, this.logger = s, this.clock = a, this.parent = c, this.options = o, this.scheduler = new Dt({ deferEvents : this.options.deferEvents }), this.sessionId = `x:${Lt++}`;
    }

    return Object.defineProperty(t.prototype, "initialState", {
        get() {
            var t = this;

            return this._initialState ? this._initialState : Nt(this, (() => (t._initialState = t.machine.initialState, t._initialState)));
        }, enumerable : !1, configurable : !0,
    }), Object.defineProperty(t.prototype, "state", {
        get() {
            return u || k(this.status !== Mt.NotStarted, `Attempted to read state from uninitialized service '${this.id}'. Make sure the service is started first.`), this._state;
        }, enumerable : !1, configurable : !0,
    }), t.prototype.execute = function(t, e) {
        var n, i;

        try {
            for(var r = o(t.actions), a = r.next(); !a.done; a = r.next()) {
                var s = a.value;

                this.exec(s, t, e);
            }
        } catch(t) {
            n = { error : t };
        } finally{
            try {
                a && !a.done && (i = r.return) && i.call(r);
            } finally{
                if(n) {
                    throw n.error;
                }
            }
        }
    }, t.prototype.update = function(t, e) {
        var n, i, r, a, s, c, u, h,
            f = this;

        if(t._sessionid = this.sessionId, this._state = t, this.options.execute && this.execute(this.state), this.children.forEach(((t) => {
            f.state.children[t.id] = t;
        })), this.devTools && this.devTools.send(e.data, t), t.event) {
            try {
                for(var l = o(this.eventListeners), d = l.next(); !d.done; d = l.next()) {
                    (0, d.value)(t.event);
                }
            } catch(t) {
                n = { error : t };
            } finally{
                try {
                    d && !d.done && (i = l.return) && i.call(l);
                } finally{
                    if(n) {
                        throw n.error;
                    }
                }
            }
        }

        try {
            for(var v = o(this.listeners), p = v.next(); !p.done; p = v.next()) {
                (0, p.value)(t, t.event);
            }
        } catch(t) {
            r = { error : t };
        } finally{
            try {
                p && !p.done && (a = v.return) && a.call(v);
            } finally{
                if(r) {
                    throw r.error;
                }
            }
        }

        try {
            for(var y = o(this.contextListeners), g = y.next(); !g.done; g = y.next()) {
                (0, g.value)(this.state.context, this.state.history ? this.state.history.context : void 0);
            }
        } catch(t) {
            s = { error : t };
        } finally{
            try {
                g && !g.done && (c = y.return) && c.call(y);
            } finally{
                if(s) {
                    throw s.error;
                }
            }
        }

        var m = bt(t.configuration || [], this.machine);

        if(this.state.configuration && m) {
            var x = t.configuration.find(((t) => t.type === "final" && t.parent === f.machine)),
                S = x && x.doneData ? E(x.doneData, t.context, e) : void 0;

            try {
                for(var w = o(this.doneListeners), b = w.next(); !b.done; b = w.next()) {
                    (0, b.value)(ft(this.id, S));
                }
            } catch(t) {
                u = { error : t };
            } finally{
                try {
                    b && !b.done && (h = w.return) && h.call(w);
                } finally{
                    if(u) {
                        throw u.error;
                    }
                }
            }

            this.stop();
        }
    }, t.prototype.onTransition = function(t) {
        return this.listeners.add(t), this.status === Mt.Running && t(this.state, this.state.event), this;
    }, t.prototype.subscribe = function(t, e, n) {
        var i,
            r = this;

        if(!t) {
            return { unsubscribe() {} };
        }

        var o = n;

        return typeof t === "function" ? i = t : (i = t.next.bind(t), o = t.complete.bind(t)), this.listeners.add(i), this.status === Mt.Running && i(this.state), o && this.onDone(o), { unsubscribe() {
            i && r.listeners.delete(i), o && r.doneListeners.delete(o);
        } };
    }, t.prototype.onEvent = function(t) {
        return this.eventListeners.add(t), this;
    }, t.prototype.onSend = function(t) {
        return this.sendListeners.add(t), this;
    }, t.prototype.onChange = function(t) {
        return this.contextListeners.add(t), this;
    }, t.prototype.onStop = function(t) {
        return this.stopListeners.add(t), this;
    }, t.prototype.onDone = function(t) {
        return this.doneListeners.add(t), this;
    }, t.prototype.off = function(t) {
        return this.listeners.delete(t), this.eventListeners.delete(t), this.sendListeners.delete(t), this.stopListeners.delete(t), this.doneListeners.delete(t), this.contextListeners.delete(t), this;
    }, t.prototype.start = function(t) {
        var e = this;

        if(this.status === Mt.Running) {
            return this;
        }

        (function(t, e) {
            Vt.set(t, e);
        }(this.sessionId, this)), this.initialized = !0, this.status = Mt.Running; var n = void 0 === t ? this.initialState : Nt(this, (() => {
            return !C(n = t) && "value" in n && "history" in n ? e.machine.resolveState(t) : e.machine.resolveState(_t.from(t, e.machine.context)); var n;
        }));

        return this.options.devTools && this.attachDev(), this.scheduler.initialize((() => {
            e.update(n, it);
        })), this;
    }, t.prototype.stop = function() {
        var t, e, n, i, r, a, s, c, u, f,
            l = this;

        try {
            for(var d = o(this.listeners), v = d.next(); !v.done; v = d.next()) {
                var p = v.value;

                this.listeners.delete(p);
            }
        } catch(e) {
            t = { error : e };
        } finally{
            try {
                v && !v.done && (e = d.return) && e.call(d);
            } finally{
                if(t) {
                    throw t.error;
                }
            }
        }

        try {
            for(var y = o(this.stopListeners), g = y.next(); !g.done; g = y.next()) {
                (p = g.value)(), this.stopListeners.delete(p);
            }
        } catch(t) {
            n = { error : t };
        } finally{
            try {
                g && !g.done && (i = y.return) && i.call(y);
            } finally{
                if(n) {
                    throw n.error;
                }
            }
        }

        try {
            for(var m = o(this.contextListeners), x = m.next(); !x.done; x = m.next()) {
                p = x.value, this.contextListeners.delete(p);
            }
        } catch(t) {
            r = { error : t };
        } finally{
            try {
                x && !x.done && (a = m.return) && a.call(m);
            } finally{
                if(r) {
                    throw r.error;
                }
            }
        }

        try {
            for(var S = o(this.doneListeners), w = S.next(); !w.done; w = S.next()) {
                p = w.value, this.doneListeners.delete(p);
            }
        } catch(t) {
            s = { error : t };
        } finally{
            try {
                w && !w.done && (c = S.return) && c.call(S);
            } finally{
                if(s) {
                    throw s.error;
                }
            }
        }

        if(!this.initialized) {
            return this;
        }

        this.state.configuration.forEach(((t) => {
            var e, n;

            try {
                for(var i = o(t.definition.exit), r = i.next(); !r.done; r = i.next()) {
                    var a = r.value;

                    l.exec(a, l.state);
                }
            } catch(t) {
                e = { error : t };
            } finally{
                try {
                    r && !r.done && (n = i.return) && n.call(i);
                } finally{
                    if(e) {
                        throw e.error;
                    }
                }
            }
        })), this.children.forEach(((t) => {
            P(t.stop) && t.stop();
        })); try {
            for(var b = o(h(this.delayedEventsMap)), E = b.next(); !E.done; E = b.next()) {
                var _ = E.value;

                this.clock.clearTimeout(this.delayedEventsMap[_]);
            }
        } catch(t) {
            u = { error : t };
        } finally{
            try {
                E && !E.done && (f = b.return) && f.call(b);
            } finally{
                if(u) {
                    throw u.error;
                }
            }
        }

        return this.scheduler.clear(), this.initialized = !1, this.status = Mt.Stopped, (function(t) {
            Vt.delete(t);
        }(this.sessionId)), this;
    }, t.prototype.batch = function(t) {
        var e = this;

        if(this.status === Mt.NotStarted && this.options.deferEvents) {
            u || k(!1, `${t.length} event(s) were sent to uninitialized service "${this.machine.id}" and are deferred. Make sure .start() is called for this service.\nEvent: ${JSON.stringify(event)}`);
        } else if(this.status !== Mt.Running) {
            throw new Error(`${t.length} event(s) were sent to uninitialized service "${this.machine.id}". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.`);
        }

        this.scheduler.schedule((() => {
            var n, r,
                c = e.state,
                u = !1,
                h = [],
                f = function(t) {
                    var n = R(t);

                    e.forward(n), c = Nt(e, (() => e.machine.transition(c, n))), h.push.apply(h, s([], a(c.actions.map(((t) => {
                        return n = c, r = (e = t).exec, i(i({}, e), { exec : void 0 !== r ? function() {
                            return r(n.context, n.event, {
                                action : e, state : n, _event : n._event,
                            });
                        } : void 0 }); var e, n, r;
                    }))))), u = u || Boolean(c.changed);
                };

            try {
                for(var l = o(t), d = l.next(); !d.done; d = l.next()) {
                    f(d.value);
                }
            } catch(t) {
                n = { error : t };
            } finally{
                try {
                    d && !d.done && (r = l.return) && r.call(l);
                } finally{
                    if(n) {
                        throw n.error;
                    }
                }
            }

            c.changed = u, c.actions = h, e.update(c, R(t[t.length - 1]));
        }));
    }, t.prototype.sender = function(t) {
        return this.send.bind(this, t);
    }, t.prototype.nextState = function(t) {
        var e = this,
            n = R(t);

        if(n.name.indexOf(Y) === 0 && !this.state.nextEvents.some(((t) => t.indexOf(Y) === 0))) {
            throw n.data.data;
        }

        return Nt(this, (() => e.machine.transition(e.state, n)));
    }, t.prototype.forward = function(t) {
        var e, n;

        try {
            for(var i = o(this.forwardTo), r = i.next(); !r.done; r = i.next()) {
                var a = r.value,
                    s = this.children.get(a);

                if(!s) {
                    throw new Error(`Unable to forward event '${t}' from interpreter '${this.id}' to nonexistant child '${a}'.`);
                }

                s.send(t);
            }
        } catch(t) {
            e = { error : t };
        } finally{
            try {
                r && !r.done && (n = i.return) && n.call(i);
            } finally{
                if(e) {
                    throw e.error;
                }
            }
        }
    }, t.prototype.defer = function(t) {
        var e = this;

        this.delayedEventsMap[t.id] = this.clock.setTimeout((() => {
            t.to ? e.sendTo(t._event, t.to) : e.send(t._event);
        }), t.delay);
    }, t.prototype.cancel = function(t) {
        this.clock.clearTimeout(this.delayedEventsMap[t]), delete this.delayedEventsMap[t];
    }, t.prototype.exec = function(t, e, n) {
        void 0 === n && (n = this.machine.options.actions); var i = e.context,
            r = e._event,
            o = t.exec || rt(t.type, n),
            a = P(o) ? o : o ? o.exec : t.exec;

        if(a) {
            try {
                return a(i, r.data, {
                    action : t, state : this.state, _event : r,
                });
            } catch(t) {
                throw this.parent && this.parent.send({ type : "xstate.error", data : t }), t;
            }
        }

        switch(t.type) {
        case $:var s = t;

            if(typeof s.delay === "number") {
                return void this.defer(s);
            }

            s.to ? this.sendTo(s._event, s.to) : this.send(s._event); break; case X:this.cancel(t.sendId); break; case F:var c = t.activity;

            if(!this.state.activities[c.id || c.type]) {
                break;
            }

            if(c.type === D.Invoke) {
                var h = U(c.src),
                    f = this.machine.options.services ? this.machine.options.services[h.type] : void 0,
                    l = c.id,
                    d = c.data;

                u || k(!("forward" in c), `\`forward\` property is deprecated (found in invocation of '${c.src}' in in machine '${this.machine.id}'). Please use \`autoForward\` instead.`); var v = "autoForward" in c ? c.autoForward : Boolean(c.forward);

                if(!f) {
                    return void(u || k(!1, `No service found for invocation '${c.src}' in machine '${this.machine.id}'.`));
                }

                var p = d ? E(d, i, r) : void 0,
                    y = P(f) ? f(i, r.data, { data : p, src : h }) : f;

                _(y) ? this.spawnPromise(Promise.resolve(y), l) : P(y) ? this.spawnCallback(y, l) : I(y) ? this.spawnObservable(y, l) : A(y) && this.spawnMachine(p ? y.withContext(p) : y, { id : l, autoForward : v });
            } else {
                this.spawnActivity(c);
            }

            break; case B:this.stopChild(t.activity.id); break; case W:var g = t.label,
            m = t.value;

            g ? this.logger(g, m) : this.logger(m); break; default:u || k(!1, `No implementation found for action type '${t.type}'`);
        }
    }, t.prototype.removeChild = function(t) {
        this.children.delete(t), this.forwardTo.delete(t), delete this.state.children[t];
    }, t.prototype.stopChild = function(t) {
        var e = this.children.get(t);

        e && (this.removeChild(t), P(e.stop) && e.stop());
    }, t.prototype.spawn = function(t, e, n) {
        if(_(t)) {
            return this.spawnPromise(Promise.resolve(t), e);
        }

        if(P(t)) {
            return this.spawnCallback(t, e);
        }

        if((function(t) {
            try {
                return typeof t.send === "function";
            } catch(t) {
                return !1;
            }
        }(r = t)) && "id" in r) {
            return this.spawnActor(t);
        }

        if(I(t)) {
            return this.spawnObservable(t, e);
        }

        if(A(t)) {
            return this.spawnMachine(t, i(i({}, n), { id : e }));
        }

        throw new Error(`Unable to spawn entity "${e}" of type "${typeof t}".`); var r;
    }, t.prototype.spawnMachine = function(e, n) {
        var r = this;

        void 0 === n && (n = {}); var o = new t(e, i(i({}, this.options), { parent : this, id : n.id || e.id })),
            a = i(i({}, Rt), n);

        a.sync && o.onTransition(((t) => {
            r.send(tt, { state : t, id : o.id });
        })); var s = o;

        return this.children.set(o.id, s), a.autoForward && this.forwardTo.add(o.id), o.onDone(((t) => {
            r.removeChild(o.id), r.send(R(t, { origin : o.id }));
        })).start(), s;
    }, t.prototype.spawnPromise = function(t, e) {
        var n = this,
            i = !1,
            r = void 0;

        t.then(((t) => {
            i || (r = t, n.removeChild(e), n.send(R(ft(e, t), { origin : e })));
        }), ((t) => {
            if(!i) {
                n.removeChild(e); var r = lt(e, t);

                try {
                    n.send(R(r, { origin : e }));
                } catch(i) {
                    !(function(t, e, n) {
                        if(!u) {
                            var i = t.stack ? ` Stacktrace was '${t.stack}'` : "";

                            if(t === e) {
                                console.error(`Missing onError handler for invocation '${n}', error was '${t}'.${i}`);
                            } else {
                                var r = e.stack ? ` Stacktrace was '${e.stack}'` : "";

                                console.error(`Missing onError handler and/or unhandled exception/promise rejection for invocation '${n}'. Original error: '${t}'. ${i} Current error is '${e}'.${r}`);
                            }
                        }
                    }(t, i, e)), n.devTools && n.devTools.send(r, n.state), n.machine.strict && n.stop();
                }
            }
        })); var o = {
            id        : e, send() {}, subscribe(e, n, i) {
                var r = (function(t, e, n) {
                        if(typeof t === "object") {
                            return t;
                        }

                        var i = function() {};

                        return {
                            next : t, error : e || i, complete : n || i,
                        };
                    }(e, n, i)),
                    o = !1;

                return t.then(((t) => {
                    o || (r.next(t), o || r.complete());
                }), ((t) => {
                    o || r.error(t);
                })), { unsubscribe() {
                    return o = !0;
                } };
            }, stop() {
                i = !0;
            }, toJSON() {
                return { id : e };
            }, getSnapshot() {
                return r;
            },
        };

        return this.children.set(e, o), o;
    }, t.prototype.spawnCallback = function(t, e) {
        var n,
            i = this,
            r = !1,
            o = new Set(),
            a = new Set(),
            s = void 0;

        try {
            n = t(((t) => {
                s = t, a.forEach(((e) => e(t))), r || i.send(R(t, { origin : e }));
            }), ((t) => {
                o.add(t);
            }));
        } catch(t) {
            this.send(lt(e, t));
        }

        if(_(n)) {
            return this.spawnPromise(n, e);
        }

        var c = {
            id : e, send(t) {
                return o.forEach(((e) => e(t)));
            }, subscribe(t) {
                return a.add(t), { unsubscribe() {
                    a.delete(t);
                } };
            }, stop() {
                r = !0, P(n) && n();
            }, toJSON() {
                return { id : e };
            }, getSnapshot() {
                return s;
            },
        };

        return this.children.set(e, c), c;
    }, t.prototype.spawnObservable = function(t, e) {
        var n = this,
            i = void 0,
            r = t.subscribe(((t) => {
                i = t, n.send(R(t, { origin : e }));
            }), ((t) => {
                n.removeChild(e), n.send(R(lt(e, t), { origin : e }));
            }), (() => {
                n.removeChild(e), n.send(R(ft(e), { origin : e }));
            })),
            o = {
                id : e, send() {}, subscribe(e, n, i) {
                    return t.subscribe(e, n, i);
                }, stop() {
                    return r.unsubscribe();
                }, getSnapshot() {
                    return i;
                }, toJSON() {
                    return { id : e };
                },
            };

        return this.children.set(e, o), o;
    }, t.prototype.spawnActor = function(t) {
        return this.children.set(t.id, t), t;
    }, t.prototype.spawnActivity = function(t) {
        var e = this.machine.options && this.machine.options.activities ? this.machine.options.activities[t.type] : void 0;

        if(e) {
            var n = e(this.state.context, t);

            this.spawnEffect(t.id, n);
        } else {
            u || k(!1, `No implementation found for activity '${t.type}'`);
        }
    }, t.prototype.spawnEffect = function(t, e) {
        this.children.set(t, {
            id : t, send() {}, subscribe() {
                return { unsubscribe() {} };
            }, stop : e || void 0, getSnapshot() {}, toJSON() {
                return { id : t };
            },
        });
    }, t.prototype.attachDev = function() {
        var t = At();

        if(this.options.devTools && t) {
            if(t.__REDUX_DEVTOOLS_EXTENSION__) {
                var e = typeof this.options.devTools === "object" ? this.options.devTools : void 0;

                this.devTools = t.__REDUX_DEVTOOLS_EXTENSION__.connect(i(i({
                    name           : this.id, autoPause      : !0, stateSanitizer(t) {
                        return {
                            value : t.value, context : t.context, actions : t.actions,
                        };
                    },
                }, e), { features : i({ jump : !1, skip : !1 }, e ? e.features : void 0) }), this.machine), this.devTools.init(this.state);
            }

            !(function(t) {
                if(At()) {
                    var e = (function() {
                        var t = At();

                        if(t && "__xstate__" in t) {
                            return t.__xstate__;
                        }
                    }());

                    e && e.register(t);
                }
            }(this));
        }
    }, t.prototype.toJSON = function() {
        return { id : this.id };
    }, t.prototype[L] = function() {
        return this;
    }, t.prototype.getSnapshot = function() {
        return this._state;
    }, t.defaultOptions = {
        execute     : !0, deferEvents : !0, clock       : { setTimeout(t, e) {
            return setTimeout(t, e);
        }, clearTimeout(t) {
            return clearTimeout(t);
        } }, logger : (typeof self !== "undefined" ? self : global).console.log.bind(console), devTools : !1,
    }, t.interpret = Jt, t;
}());

function Jt(t, e) {
    return new zt(t, e);
}

var Ut = { configEditor : {
    addEventListener : (t, e = {}) => ({ ...t, on : { ...t.on || {}, ...e } }), addContext : (t, e = {}) => ({ ...t, context : { ...t.context || {}, ...e } }), addState : (t, e = {}) => ({ ...t, state : { ...t.state || {}, ...e } }),
}, extractMetadata : (t, e) => {
    const { idMap:n } = t.machine;

    return Object.entries(n).reduce(((t, [ n, i ]) => (i.meta && e.forEach(((e) => {
        i.meta[e] && t.set(n.replace("(machine).", ""), i);
    })), t)), new Map());
} }; const { configEditor:Ft, extractMetadata:Bt } = Ut; const
    qt = "plugin:components:UPDATE_COMPONENTS";

exports.component = (t, e = {}, n) => ({ ...e, meta : { ...e.meta, component : { component : t, props : n } } }), exports.default = ({ context:t = "components" } = {}) => ({ config : (e = {}) => {
    let i = { ...e }; var r;

    return i = Ft.addEventListener(i, { [qt] : { actions : (r = { [t] : (t, { data:e }) => e }, { type : n, assignment : r }) } }), i = Ft.addContext(i, { [t] : [] }), i;
}, service : (t, e) => {
    const n = Bt(e, [ "component", "props" ]); let i = !1;

    e.subscribe((async (t = {}) => {
        try {
            const r = await(async (t, e) => {
                const n = []; const i = t.toStrings().sort(); const
                    r = (t, n = !1, i) => {
                        const [ o, ...a ] = n.split("."); const s = a.join("."); const
                            c = t.findIndex(((t) => t.state === o));

                        if(c > -1) {
                            const e = t[c].children;

                            r(e, s, i);
                        } else {
                            e.has(i) ? t[t.length] = {
                                children : [], state : o, component : e.get(i).meta.component.component, props : e.get(i).meta.component.props,
                            } : s && r(t, s, i);
                        }
                    };

                return i.forEach(((t) => r(n, t, t))), n;
            })(t, n); let o = "";

            try {
                o = JSON.stringify(r);
            } catch(t) {
                o = !1, console.log("ERROR", t);
            }

            o && o !== i && (i = o, e.send({ type : qt, data : r }));
        } catch(t) {
            console.log(t);
        }
    }));
} });
