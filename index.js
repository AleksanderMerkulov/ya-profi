const express = require("express");
const {response} = require("express");

const app = express();
app.use(express.json());

users = [
    {
        'Фамилия':'Иванов',
        'Имя':'Иван',
        'Отчество':'Иванович',
        'Почта':'зубенко@mail.ru',
    },
    {
        'Фамилия':'Зубенко',
        'Имя':'Иван',
        'Отчество':'Петрович',
        'Почта':'иванушка@mail.ru',
    },
    {
        'Фамилия':'Петров',
        'Имя':'Петр',
        'Отчество':'Павлович',
        'Почта':'петров_петр@mail.ru',
    },
    {
        'Фамилия':'Павлов',
        'Имя':'Иван',
        'Отчество':'Петрович',
        'Почта':'иванпавлов@mail.ru',
    },
    // {
    //     'Фамилия':'',
    //     'Имя':'',
    //     'Отчество':'',
    //     'Почта':'@mail.ru',
    // },
    // {
    //     'Фамилия':'',
    //     'Имя':'',
    //     'Отчество':'',
    //     'Почта':'@mail.ru',
    // },
]

function findByString(str){
    let matchList = []
    let componentsOfString = str.split(' ');

    for (const user of users) {
        let matchUserKeys = []
        for(let i = 0;i < componentsOfString.length; i++) matchUserKeys.push(false);

        let counter = 0 //счётчик совпадений(т.к. пробел выступает у нас в роли логиеского И, то мы должны учитывать количество совпадений
        for (let userKey in user) {
            componentsOfString.forEach((cp, i) => {
                if(user[userKey].includes(cp)){
                    matchUserKeys[i] = true;
                }
            })

        }

        for (const matchUserKey of matchUserKeys) {
            if(matchUserKey === true) counter++
        }

        console.log(matchUserKeys)
        if(componentsOfString.length === counter) matchList.push(user)
    }

    return JSON.stringify(matchList)
}

app.get('/',(req, response)=>{
    response.send("<h2>Server is working</h2>")

})

app.get('/:str', (req, res)=>{
    console.log("========REQUEST=======")
    const string = req.params.str
    // findByString(string)
    res.send(findByString(string))
})

app.listen(8080, function(){
    console.log("Сервер ожидает подключения...");
});
