(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(21)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),i=a.n(c),s=(a(16),a(1)),l=a(2),u=a(3),o=a(5),f=a(4),h=a(6),p=(a(17),a(7)),m=(a(18),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(o.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).changeValue=function(e){a.props.changeValue(a.props.index)},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.value;return r.a.createElement("span",{className:"cage",onClick:this.changeValue},e)}}]),t}(r.a.Component)),v=(a(19),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(f.a)(t).call(this,e))).changeValue=function(e){var t=a.state,n=t.cageValues,r=t.currentTurnType,c=t.turnType,i=a.props,l=i.playerType,u=i.mode;if((r===l&&"AI"===u||"AI"!==u)&&" "===n[e]){var o=Object(p.a)(n);o[e]=r;var f=c["X"===r];a.setState(Object(s.a)({},a.state,{cageValues:o,currentTurnType:f})),setTimeout(function(){a.aiTurn()},500)}},a.restart=function(){a.setState({cageValues:Array(9).fill(" "),turnType:{false:"X",true:"O"},end:"",currentTurnType:"X"}),a.props.onRestart()},a.aiTurn=function(){var e=a.state,t=e.cageValues,n=e.currentTurnType,r=e.end,c=e.turnType,i=a.props,l=i.mode,u=i.difficulty,o=i.playerType;if("AI"===l&&n!==o&&!r){var f=function(e,t,a,n){var r=[];if(e.forEach(function(e,t){" "===e&&r.push(t)}),"0"!==t)for(var c=0;c<r.length;c++){var i=r[c],s=Object(p.a)(e);s[i]=a;var l=d(s);if(l===a)return r[c]}if("2"!==t){var u=Math.random();return r[Math.ceil(r.length*u)-1]}for(var o=[0,2,6,8],f=[1,3,5,7],h=0;h<r.length;h++){var m=r[h],v=Object(p.a)(e);v[m]=n;var y=d(v);if(y===a)return r[h]}if(" "===e[4])return 4;for(var g=0;g<o.length;g++){var O=o[g];if(" "===e[O])return O}for(var b=0;b<f.length;b++){var T=f[b];if(" "===e[T])return T}}(t,u,o,n);if(" "===t[f]){var h=Object(p.a)(t);h[f]=n;var m=c["X"===n];a.setState(Object(s.a)({},a.state,{cageValues:h,currentTurnType:m}))}}},a.state={cageValues:Array(9).fill(" "),turnType:{false:"X",true:"O"},end:"",currentTurnType:"X"},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.cageValues,n=t.end,c=this.props,i=c.restart,s=c.playerType,l=c.mode,u=a.map(function(t,a){return r.a.createElement(m,{value:t,index:a,changeValue:e.changeValue})}),o=d(a);if(i&&this.restart(),"O"===s&&"AI"===l&&setTimeout(function(){e.aiTurn()},500),!n){var f=o?"end"===o?"End Game":"Winner "+o:"";f&&this.props.finishGame(f)}return r.a.createElement("div",{className:"board"},u)}}]),t}(r.a.Component));function d(e){var t=[[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]],a={X:[],O:[]};if(e.forEach(function(e,t){" "!==e&&a[e].push(t)}),a.X.length+a.O.length<4)return null;for(var n in a)for(var r=a[n].sort(),c=0;c<t.length;c++){for(var i=t[c],s=0,l=0;l<i.length;l++)y(r,i[l])&&s++;if(3===s)return n}return a.X.length+a.O.length===9?"end":null}function y(e,t){for(var a=0;a<e.length;a++)if(t===e[a])return!0;return!1}a(20);var g=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(o.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).onClick=function(e){a.props.playerChoice(a.props.value)},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.text;return r.a.createElement("span",{className:"controll",onClick:this.onClick},e)}}]),t}(r.a.Component),O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(f.a)(t).call(this,e))).finishGame=function(e){a.setState(Object(s.a)({},a.state,{endGame:"true",message:e,gameStage:3,restart:!0}))},a.setMode=function(e){var t="AI"===e?4:2;a.setState(Object(s.a)({},a.state,{mode:e,gameStage:t}))},a.setDifficulty=function(e){a.setState(Object(s.a)({},a.state,{difficulty:e,gameStage:2}))},a.setType=function(e){a.setState(Object(s.a)({},a.state,{playerType:e,gameStage:1}))},a.goToMenu=function(){a.setState(Object(s.a)({},a.state,{gameStage:0}))},a.onRestart=function(){a.setState(Object(s.a)({},a.state,{restart:!1}))},a.state={gameStage:0,end:{ind:"false",message:""},playerType:"X",mode:"player",difficulty:"0",restart:!1},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state,t=e.message,a=e.endGame,n=e.gameStage,c=e.mode,i=e.difficulty,s=e.playerType,l=e.restart;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"gameArea",hidden:2!==n},r.a.createElement(v,{finishGame:this.finishGame,mode:c,difficulty:i,playerType:s,onRestart:this.onRestart,restart:l})),r.a.createElement("div",{className:"selectModeArea",hidden:0!==n},r.a.createElement(g,{value:"AI",text:"1 player",playerChoice:this.setMode}),r.a.createElement(g,{value:"player",text:"2 player",playerChoice:this.setMode})),r.a.createElement("div",{className:"selectTypeArea",hidden:4!==n},r.a.createElement(m,{value:"O",index:"O",changeValue:this.setType}),r.a.createElement(m,{value:"X",index:"X",changeValue:this.setType})),r.a.createElement("div",{className:"selectDifficultyArea",hidden:1!==n},r.a.createElement(g,{value:"0",text:"easy",playerChoice:this.setDifficulty}),r.a.createElement(g,{value:"1",text:"normal",playerChoice:this.setDifficulty}),r.a.createElement(g,{value:"2",text:"hard",playerChoice:this.setDifficulty})),r.a.createElement("div",{className:"endGame",hidden:3!==n},r.a.createElement("span",{className:"message",visible:a},t),r.a.createElement(g,{value:"",text:"menu",playerChoice:this.goToMenu}),r.a.createElement(g,{value:i,text:"restart",playerChoice:this.setDifficulty})))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[10,1,2]]]);
//# sourceMappingURL=main.7a7441bf.chunk.js.map