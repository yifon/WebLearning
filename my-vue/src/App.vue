<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input v-model="newItem" v-on:keyup.enter="addNew">
    <ul>
      <li v-for="item in items" v-bind:class="{finished:item.isFinished}" v-on:click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>
    <p>child tells me: {{childWords}} </p>
    <component-a msgfromfather="you die!" v-on:child-tell-me-something="listenToMyBoy"></component-a>
  </div>
</template>

<script>
  import Store from './store';
  import ComponentA from './components/componentA';
  export default {
    data: function () {
      return {
        title: 'this is a todo list',
        items: Store.fetch(),
        newItem: "",
        childWords: ""
      }
    },
    components: {
      ComponentA
    },
    watch: {
      items: {
        handler: function (items) {
          Store.save(items);
        },
        deep: true //深度 watcher
      }
    },
    methods: {
      toggleFinish: function (item) {
        item.isFinished = !item.isFinished;
      },
      addNew: function () {
        this.items.push({
          label: this.newItem,
          isFinished: false
        })
        this.newItem = ""
      },
      listenToMyBoy: function (msg) {
        this.childWords = msg; //childWords需要在data中先被声明才可以获取到
      }
    }
  }

</script>

<style>
  .finished {
    text-decoration: underline;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>

