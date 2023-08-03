namespace todo {
    let id = 1;
    const vueApp = Vue.extend({
        data() {
            return {
                todoText: '',
                todoLimit: null,
                todoList: [] as Server.ITodo[],
                showDoneTodo: true,
                dialog: {title: "", message: "", isActive: false}
            }
        },
        methods: {
            async addTodo() {
                if(!this.todoText.length) {
                    this.dialog.message = '内容を空で登録できません'
                    this.dialog.isActive = true
                    return
                }
                const todoApi = new Server.TodoApi()
                try {
                    await todoApi.registerTodo({
                        todo_detail: this.todoText,
                        limit_date: this.todoLimit,
                    })
                    this.todoText = ""
                    this.todoLimit = null
                } catch (e) {
                    this.dialog.message = '登録に失敗しました。再度登録してください。'
                    this.dialog.isActive = true
                }
                this.todoList = await todoApi.getTodoList(this.showDoneTodo)
            },
            async toggleDone(todo: Server.ITodo) {
                try {
                    const todoApi = new Server.TodoApi()
                    await todoApi.updateTodo({...todo, done_flg: todo.done_flg ? 0 : 1})
                    this.todoList = await todoApi.getTodoList(this.showDoneTodo)
                } catch (e) {
                    this.dialog.message = '更新に失敗しました。再度更新してください。'
                    this.dialog.isActive = true
                }
            }
        },
        computed: {
            computedShowDoneTodo: {
                get() {
                    return this.showDoneTodo
                },
                async set(v: boolean) {
                    try {
                        const todoApi = new Server.TodoApi()
                        this.todoList = await todoApi.getTodoList(this.showDoneTodo)
                        this.showDoneTodo = v
                    } catch (e) {
                        this.dialog.message = '取得に失敗しました。再度取得してください。'
                        this.dialog.isActive = true
                    }
                }
            }
        },
    })

    new vueApp({
        el: "#app",
        delimiters: ["[[", "]]"],
    })
}