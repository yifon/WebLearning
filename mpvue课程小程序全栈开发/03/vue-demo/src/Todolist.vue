<template>
  <div>
    <div>
      <Title :title="title" :subtitle="subtitle"></Title>
      <input @keyup.enter="handleClick" type="text" v-model='mytodo'>
      <button @click='handleClick'>添加</button>
      <button @click='clean'>清空</button>
    </div>
    <ul>
      <li :class="{'done':todo.done}" @click='toggle(index)' v-for='(todo,index) in todos'>{{index+1}}:{{todo.text}}</li>
    </ul>
    <p>{{remain}}/{{todos.length}}</p>
  </div>
</template>

<script>
  import Title from './components/Title'
  export default {
    components: {
      Title
    },
    data() {
      return {
        title: 'hello vuejs',
        subtitle: 'Vue React is good',
        showSub: true,
        mytodo: '',
        todos: [{
            text: '吃饭',
            done: false
          },
          {
            text: '睡觉',
            done: false
          },
          {
            text: '写代码',
            done: false
          }
        ]
      }
    },
    methods: {
      handleClick() {
        this.todos.push({
          text: this.mytodo,
          done: false
        });
        this.mytodo = '';
      },
      toggle(index) {
        this.todos[index].done = !this.todos[index].done;
      },
      clean() {
        this.todos = this.todos.filter(v => !v.done);
      }
    },
    computed: {
      remain() {
        return this.todos.filter(v => !v.done).length;
      }
    },
  }
</script>
<style>
</style>
