<template>
  <div>
    <p id="title_P">Test</p>
    <button @click="practic1">Click!</button>
    <form id="test-form" action="#0" onsubmit="return false;">
      <p>
        <label>
          Name:
          <input name="name" />
        </label>
      </p>
      <p>
        <label>
          Email:
          <input name="email" />
        </label>
      </p>
      <p>
        <label>
          Password:
          <input name="password" type="password" />
        </label>
      </p>
      <p>
        Gender:
        <label>
          <input name="gender" type="radio" value="m" checked /> Male
        </label>
        <label>
          <input name="gender" type="radio" value="f" /> Female
        </label>
      </p>
      <p>
        <label>
          City:
          <select name="city">
            <option value="BJ" selected>Beijing</option>
            <option value="SH">Shanghai</option>
            <option value="CD">Chengdu</option>
            <option value="XM">Xiamen</option>
          </select>
        </label>
      </p>
      <p>
        <button type="submit">Submit</button>
      </p>
    </form>

    <button @click="practic2">jQurey-DOM练习</button>
    <div id="test-div">
      <ul>
        <li>
          <span>JavaScript</span>
        </li>
        <li>
          <span>Python</span>
        </li>
        <li>
          <span>Swift</span>
        </li>
      </ul>
    </div>

    <!-- HTML结构 -->
    <form id="test-form" action="test">
      <legend>请选择想要学习的编程语言：</legend>
      <fieldset>
        <p>
          <label class="selectAll">
            <input type="checkbox" />
            <span class="selectAll">全选</span>
            <span class="deselectAll">全不选</span>
            <span class="invertSelect">反选</span>
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="lang" value="javascript" /> JavaScript
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="lang" value="python" /> Python
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="lang" value="ruby" /> Ruby
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="lang" value="haskell" /> Haskell
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="lang" value="scheme" /> Scheme
          </label>
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </fieldset>
    </form>

    <div id='vuex'>
      <p>Vuex</p>
      <div><label >count:</label> <span>{{count}}</span></div>
     <div> <label >alias:</label> <span>{{alias}}</span></div>
      <div><label >countPlusLocalState:</label> <span>{{countPlusLocalState}}</span></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "underscore";
import {mapState} from 'vuex'
var log = function(val) {
  console.log(val);
};
export default {
  data() {
    return {
      
    };
  },
  methods: {
    practic1() {
      var json = {};

      $("#test-form")
        .find("input, select")
        .filter(function() {
          return this.name != "gender" || this.checked;
        })
        .map(function() {
          json[this.name] = this.value;
        });

      /* var obj = $("#test-form input,select")
        .filter(function() {
          return this.type != "radio" &&this.type!='submit'|| this.checked ;
        })
        .map(function() {
          return { [this.name]: this.value };
        })
        .get();

      log(obj)
      var json = JSON.stringify(obj);
 */
      json = JSON.stringify(json);
      log(json);
    },
    practic2() {
      var ul = $("#test-div ul");
      ul.append("<li><span>Pascal</span></li>");
      ul.append("<li><span>Lua</span></li>");
      ul.append("<li><span>Rubby</span></li>");
      var list = ul.find("li");
      log(list);

      var sorted = _.sortBy(list, function(e) {
        return e.innerHTML;
      });

      ul.append(sorted);
    }
  },
  created() {},
  computed:{
     
     ...mapState({
        count:(state)=>state.count*2,
        alias:'count',
        countPlusLocalState (state) {
        return state.count + this.count
    }
     })
     
     }
  
};

$(function() {
  var form = $("#test-form"),
    langs = form.find("[name=lang]"),
    selectAll = form.find("label.selectAll :checkbox"),
    selectAllLabel = form.find("label.selectAll span.selectAll"),
    deselectAllLabel = form.find("label.selectAll span.deselectAll"),
    invertSelect = form.find("a.invertSelect");

  // 重置初始化状态:
  form
    .find("*")
    .show()
    .off();
  form
    .find(":checkbox")
    .prop("checked", false)
    .off();
  deselectAllLabel.hide();
  // 拦截form提交事件:
  form.off().submit(function(e) {
    e.preventDefault();
    alert(form.serialize());
  });

});
</script>