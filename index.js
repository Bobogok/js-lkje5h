const log = console.log;

/* Почему при сложении двух float значений у нас может теряется точность? 
В JavaScript нет возможности для хранения точных значений 0.1 или 0.2, используя двоичную систему, точно также, как нет возможности хранить одну третью в десятичной системе счисления. 
Числовой формат IEEE-754 решает эту проблему путём округления до ближайшего возможного числа. Из за этого возникают такие числа.
https://learn.javascript.ru/number#netochnye-vychisleniya */
// log(0.1 + 0.2);
// log(`Исправление: ${+(0.1 + 0.2).toFixed(2)}`);
// log(9999999999999999);
// log(`Исправление: ${9999999999999999n}`);

/* Для чего используется оператор "&&", "||", "!", "!!"?
Для начала стоит понимать что будет вычислятся первым в таблице приоритетности. 
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
Так же стоит знать что такое Truthy и Falsy
https://developer.mozilla.org/en-US/docs/Glossary/Truthy
https://developer.mozilla.org/en-US/docs/Glossary/Falsy
&& - сравнивает операнды слева направо и если оба они = true, тогда возвратит последний операнд. Когда один из операндов = false - оператор возвратит этот операнд.
|| = сравнивает операнды слева направо и если какой нибудь из них имеет значение true - этот операнд и возвращается. Когда оба операнда = false - оператор возвратит последний операнд
! = оператор отрицания или еще называют логичеким NOT - возвращает Boolean в случае, если ! был применен на Boolean, в другом случае js попытает преобразовать значение справа от ! в Boolean и 'перверенет' его на противоположное.
!! = оператор двойного отрицания принудительно приводит значение к boolean primitive
*/
// &&
// log(0 && -1) //2ое правило &&
// log('true' && 'false') // строки считаются как t
// log('' && 'true') // пустая строка считается как f
// let a = true && 0 + 1; // + имеет больший приоритет, поэтому выполняется сначала вывод его выражения, а уже потом вывод оператора &&
// log(a);
// ||
// log(0 || 1) один из операндов == true и выводится именно он
// log('string' || false) один из операндов == true и выводится именно он
// log('' || 0) // оба оператора == f; 0 -2ое правило ||
// let a = false || 55; // один из операндов == true и выводится именно он
// log(a) // 55
//!
// log(!true) // True переводится в false
// log(!'') // Пустая строка false , переводится в true
// log(!'false') // заполненная строка в любом случае считается как t и переводится  в false
// log(![]) // Пустой массив true, переводится в false
//!!
// log(!!true) // true -> false -> true
// log(!!0) // false -> true -> false
// log(!!'false') // true -> false -> true
// log(!!{}) // true -> false -> true

/* Как ты понимаешь, что такое this?
Свойство контекста выполнения кода (global, function или eval), которое в нестрогом режиме всегда является ссылкой на объект, а в строгом режиме может иметь любое значение.
В глобальном контексте выполнения (за пределами каких-либо функций) this ссылается на глобальный объект вне зависимости от режима (строгий или нестрогий).
В пределах функции значение this зависит от того, каким образом вызвана функция. Имеется ввиду что есть разница между тем как вызывать фцию внутри которой this, используется ли обычный вызов, так и вызовы с методами apply, call, bind (О них можно прочитать ниже).
В пределах объекта значение this выставляется из ближайшего родительского объекта метода, который вызывается.

https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%BE-%D0%BE-%D1%82%D0%BE%D0%BC-%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D0%B5%D1%82-this-%D0%B2-javascript-a13b4b6ec9ac
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this
*/
//global
// log(this) // ссылается на window
// //function
// function thisIs() {
//   log(`this является: ${this}`)
// }
// thisIs() //вызов фции происходит без какой либо привязки
//Object
// let obj = {
//   name: 'Ivan',
//   surname: 'DarkHolmie',
//   age: 20,
//   callThis: function() {
//     log(`this является: ${this}`);
//   },
//   callMyName: function() {
//     log(`this.name является: ${this.name}`);
//   }
// }
// thisIs.call(obj) // с привязкой выводит this - Object
// obj.callThis() // вызов метода с this без привязки, ссылается на Object, который вызвал этот метод
// obj.callMyName() // так же мы из вызвавшего объекта вытаскиваем pyfxtybt свойствf name
// 2ой пример 2 объекта
// let programmers = {
//   name: 'Ivan',
//   sex: 'Dangeon Master', // *
//   nickname: function() {
//     return this.sex
//   },
//   otherIvan: {
//     sex: 'Cumshoter', // *
//     nickname: function() {
//       return this.sex
//     }
//   }
// }
// log(programmers.nickname())
// log(programmers.otherIvan.nickname()) // здесь мы видим цепочку из вызова объекта как свойства другого объекта, this следует правилу и привязывается к ближайшему объекту (otherIvan), а не к тому который изначально его вызывал (programmers).
//Object особенности new и class
// Когда используется new, this привязывается к новому объекту, который только что был создан
// class Me {
//   constructor(name, surname) {
//     this.name = name;
//     this.surname = surname;
//   }

//   callme() {
//     return `My name is ${this.name}, surname is ${this.surname}`;
//   }
// }
// let profileObj = {
//   name: 'Ivan',
//   surname: 'Dangeon Master'
// }
// log(new Me().callme.call(profileObj)); //вызов метода с помощью call - примязка свойств нашего объекта
// let me = new Me('Ivan', 'Dick300'); // создание нового объекта и вызов его уже с переданными как аргуметы значеними
// log(me.callme())

/* Что такое apply, call, bind? В чем состоит разница между ними?
В JavaScript функции это объекты. И как объекты, функции имеют свои методы,как apply(), call() и bind(). 
Можно сказать, что Apply() и Call() буквально идентичны друг другу и зачастую используются в JavaScript для того, чтобы заимствовать методы и выставлять значения this.
В общем.
bind() - 
*/
// TODO прописать все дескрипшоны к методам функции + примеры
