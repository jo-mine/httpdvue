namespace todo {
    interface ITodo {
        id: number;
        todoText: string;
        todoLimit?: string;
        isDone: boolean;
    }
    let id = 1;
    const vueApp = Vue.extend({
        data() {
            return {
                todoText: '',
                todoLimit: null,
                todoList: [] as ITodo[],
                showDoneTodo: false,
                dialog: {title: "", message: "", isActive: false}
            }
        },
        methods: {
            addTodo() {
                if(!this.todoText.length) {
                    this.dialog.message = '内容を空で登録できません'
                    this.dialog.isActive = true
                    return
                }
                this.todoList.unshift({
                    id: id++,
                    todoText: this.todoText,
                    todoLimit: this.todoLimit,
                    isDone: false
                })
                this.todoText = ""
                this.todoLimit = null
            }
        },
        computed: {
            computedTodoList(): ITodo[] {
                if (this.showDoneTodo) {
                    return this.todoList
                }
                return this.todoList.filter(v => !v.isDone)
            }
        },
    })

    new vueApp({
        el: "#app",
        delimiters: ["[[", "]]"],
    })
}