var app = new Vue({
    el: '#root',
    data: {
        allReposArray: [],
        indexArrayFlag: 4,
        reposArray: []
    },

    created: function () {
        this.fetchData()
    },
    mounted () {
        window.addEventListener('scroll', this.checkingScroll)
    },


    methods: {
        fetchData: function () {
            var that = this;
            var apiURL = fetch('https://api.github.com/users/D50000/repos');
            apiURL.then(result => result.json())
                .then(result => {
                    that.allReposArray = result;
                    console.log(that.allReposArray);
                    that.reposArray = result.slice(0, 5);
                    console.log(that.reposArray);
                })
                .catch((err) => {
                    console.error(err);
                })
        },

        swap: function () {
            if(this.indexArrayFlag + 1 >= this.allReposArray.length) return console.log("---  No more data  ---");
            this.reposArray = this.reposArray.concat(this.allReposArray.slice(this.indexArrayFlag + 1, this.indexArrayFlag + 6));
            // console.log(this.reposArray);
            this.indexArrayFlag = this.indexArrayFlag + 5;
            // console.log(this.indexArrayFlag);
        },

        checkingScroll () {
            var scrollTop = (document.documentElement && document.documentElement.scrollTop);
            var scrollHeight = (document.documentElement && document.documentElement.scrollHeight);
            var viewHeight = document.documentElement.clientHeight || window.innerHeight;
            var scrolledToBottom = Math.ceil(scrollTop + viewHeight) >= scrollHeight;
            // console.log(`${scrollTop} + ${viewHeight} >= ${scrollHeight} => ${scrolledToBottom}`);
            this.fly();
            if(scrolledToBottom) this.swap();
        },

        fly () {
            var move = document.querySelector(".parallax").offsetLeft + 5;
            console.log(move);
            document.querySelector(".parallax").setAttribute("style", "left:" + move +"px");
        }
    }
})