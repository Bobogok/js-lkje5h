const log = console.log;

/* Почему при сложении двух float значений у нас может теряется точность? 
В JavaScript нет возможности для хранения точных значений 0.1 или 0.2, используя двоичную систему, точно также, как нет возможности хранить одну третью в десятичной системе счисления. 
Числовой формат IEEE-754 решает эту проблему путём округления до ближайшего возможного числа. Из за этого возникают такие числа.
https://learn.javascript.ru/number#netochnye-vychisleniya */
// log(0.1 + 0.2);
// log(`Исправление: ${+(0.1 + 0.2).toFixed(2)}`);
// log(9999999999999999);
// log(`Исправление: ${9999999999999999n}`);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Как ты понимаешь, что такое this?
Свойство контекста выполнения кода (global, function или eval), которое в нестрогом режиме всегда является ссылкой на объект, а в строгом режиме может иметь любое значение.
В глобальном контексте выполнения (за пределами каких-либо функций) this ссылается на глобальный объект вне зависимости от режима (строгий или нестрогий).
В пределах функции значение this зависит от того, каким образом вызвана функция. Имеется ввиду что есть разница между тем как вызывать фцию внутри которой this, используется ли обычный вызов, так и вызовы с методами apply, call, bind (О них можно прочитать ниже).
В пределах объекта значение this выставляется из ближайшего родительского объекта метода, который вызывается.
В стрелочных функциях, this привязан к окружению, в котором была создана функция.

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
// Стрелочные фции
// let obj = { bar : function() {
//               let x = (() => this);
//               return x;
//             }
//           };
// let something = obj.bar() //Присваиваем ссылку возвращаемой функции переменной something
// log(something() === obj) // вызываем стрелочную функцию без определения this, срелочная фция понимает на каком объекте она была заскнута (obj), при использовании обычной фции в таком же контексте - мы бы получали window

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Что такое apply, call, bind? В чем состоит разница между ними?
В JavaScript функции это объекты. И как объекты, функции имеют свои методы,как apply(), call() и bind(). 
Можно сказать, что Apply() и Call() буквально идентичны друг другу и зачастую используются в JavaScript для того, чтобы заимствовать методы и выставлять значения this.
В общем.
// call() --- /
// Метод call() вызывает функцию с указанным значением this и индивидуально предоставленными аргументами.

// Синтаксис
// fun.call(thisArg[, arg1[, arg2[, ...]]])

// Пример с объектом:
// let person = { // Создаем объект к которому мы будет использовать call()
//   name: 'Ivan', // Имя
//   age: 96, // Возраст
//   personInfo() { // Информация
//     log(`Этого человека зовут ${this.name}. Его возраст составляет ${this.age}`)
//   },
// }

// let person2 = { // Создаем объект , который мы будем использовать как 'this'
//   name: 'Vanya', // Имя
//   age: 30 // Возраст
// }

// person.personInfo.call(person2) // Используем наш объект person2 , как this в методе personInfo объекта person. Без написания какого любого объекта в методе call , this.name == und и this.age == und , то есть this не будет ссылаться на какой-то объект.

// Пример с классом и объектом:

// class Animal { // Создаем класс к которому мы будет использовать call()
//   constructor(name,volume) { // Конструктор принимает переданные аргументы и укомплектовывает их
//     this.name = name; // name == первому переданному аргументу
//     this.volume = volume // volume == второму переданному аргументу
//   }
//   getInfo(food,age) { // Создаем метод, в котором используется аргументы , выступающие , как св-ва
//     this.food = food // Добавляем дополнительные св-ва переданные , как аргумент в вызове данного метода
//     this.age = age // 
//     log(`Это животное  ${this.name}. Ему ${this.age} лет. Громкость которого ${this.volume} дцб. Питается   //      чаще всего ${this.food}`)
//   }
// }

// let lion = { //  Создаем объекты, которые будут использоваться , как this в методе getInfo() класса Animal
//   name: 'Лев',
//   volume: '0.9'
// }

// let tiger = {
//   name: 'Тигр',
//   volume: '0.7'
// }
/* new Animal().getInfo.call(lion, 'Мясом', '19') // Создаем новый объект и привязываем с помощью call() объект lion, теперь lion выступает за роль this , а так-же добавляем 2 аргумента в метод getInfo() 
this.food == "Мясом", this.age == 19. 
Получаем: Это животное Лев. Ему 19 лет. Громкость которого 0.9 дцб. Питается чаще всего Мясом.
*/
// new Animal().getInfo.call(tiger, 'Мясом', '10')
// Получаем: Это животное Тигр. Ему 10 лет. Громкость которого 0.7 дцб. Питается чаще всего Мясом.

// apply() --- /
// Метод apply() полностью идентичен функции call(), но принимает в себя массив, как аргумент

// Синтаксис
// fun.apply(thisArg, [argsArray])

// Пример с классом и объектом

// class Animal {
//   constructor(name,volume) {
//     this.name = name;
//     this.volume = volume
//   }
//   getInfo(food,age) {
//     this.food = food
//     this.age = age
//     log(`Это животное  ${this.name}. Ему ${this.age} лет. Громкость которого ${this.volume} дцб.   Питается  чаще всего ${this.food}`)
//   }
// }

// let arr = ['Мясом', 19]

// let lion = {
//   name: 'Лев',
//   volume: '0.9'
// }

// let tiger = {
//   name: 'Тигр',
//   volume: '0.7'
// }

// new Animal().getInfo.apply(lion, arr) // Как мы видим, вся процедура такая-же , как и call(), только в аргументы передаем массив, а в call() через запятую
// new Animal().getInfo.apply(tiger, ['Мясом', 10])

// bind() --- /
// Метод bind() Cоздаёт новую функцию, которая при вызове устанавливает в качестве контекста выполнения this предоставленное значение.
//
// Синтаксис
// fun.bind(thisArg[, arg1[, arg2[, ...]]])
//
//Пример с классом и объектом
//

// let date = new Date(); // создаем переменную которая будет являтся ссылкой на объект Date

// class Person  {
//   constructor(name,yearBirth) {
//     this.name = name,
//     this.yearBirth = yearBirth
//   }
// calculateAge() {
//   log(`${this.name}, ${date.getFullYear() - this.yearBirth} год`)
// }
// }

// let obj = {
//   name: 'Egor',
//   yearBirth: 1990,
// }

// new Person().calculateAge.bind(obj)() //  Привязываем к методы класса Person объект obj , как this
//Результат : Egor , 31 год
//Пример с объектом // создаем переменную которая будет являтся ссылкой на объект Date
//
// let date = new Date();
// let person = {
//   name: 'Egor',
//   yearBirth: 1985,
//   calculateAge(job) {
//     log(`${this.name}, ${date.getFullYear() - this.yearBirth} год. Работает на ${job}`)
//   }
// }

// let person2 = {
//   name: 'Vlad',
//   yearBirth: 1930,
// }

// person.calculateAge.bind(person2, 'Стройке')()
// Привязываем к методы объекта person объект person2 , как this
//Результат : Vlad , 91 год

// Итог: bind,call,aplly мы используем для привязки объекта , как this в методаъ объектов, классов и функкий конструкторов

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////\

// Какая разница между ключевыми словами «var», «let» и «const»?
/*  let и const ведут себя одинаково по отношению к лексическому окружению, области видимости. 
Для «var» не существует блочной области видимости. «var» обрабатываются в начале запуска функции - Это поведение называется «hoisting» (всплытие, поднятие), потому что все объявления переменных var «всплывают» в самый верх функции.
В браузере глобальные функции и переменные, объявленные с помощью var (не let/const!), становятся свойствами глобального объекта
Значение переменной, объявленной с помощью const, нельзя переназначить. Есть некоторое недопонимание этого понятия, поднобнее ниже в примерах
Область видимости var переменных ограничена функцией, если вы обратитесь к переменной до её объявления, то получите undefined. const и let ограничены блоком, а попытка обратится к переменной до её объявления, вернётся ошибкой ReferenceError. И наконец, разница между let и const в том, что в первом случае вы можете изменить значение переменной, а во втором нет.

https://learn.javascript.ru/var
https://learn.javascript.ru/global-object
https://medium.com/nuances-of-programming/%D0%B2-%D1%87%D1%91%D0%BC-%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-var-let-%D0%B8-const-%D0%B2-javascript-3084bfe9f7a3
*/
// const - Константа
// const something = 'string';
// something = 'another' // переназнчить константу невозможно

// const arr = [1, 2, 3];
// arr[1] = 5 // мы можем изменить значение под индесом 1 в массиве
// delete arr[0] // даже удалять
// arr.length = 0 // или даже так
// arr = []; но мы НЕ можем сделать так
// log(arr);

// const obj = {
//   name: 'Ivan'
// };
// obj.name = 'Max' // мы можем изменить свойство
// obj.surname = 'Master' // добавлять свойства
// obj.showFullName = function() {
//   return `Меня зовут ${this.name} ${this.surname}` // даже добавлять ии вызывать методы
// }
// log(obj)
// log(obj.showFullName())
// obj = 'another obj' // но не можем изменять значение константы

// var всплывает, let нет
// function hoisting() {
//   // log(variable) // var всплыло но пока не было передано значение
//   // variable = 'something'
//   // var variable;

//   // log(variable) // Ощибка инициализации
//   // variable = 'something'
//   // let variable;
// }
// hoisting()

// var всплывает, у него нет блочной области видимости, только глобальная и функциональная
// function one() {
//   log(digit) // var всплывает, переменная объявлена, но не имеет значения (und)
//   digit = 50; // присваиваем значение var
//   var digit;
//   function two() {
//     var digit = 100; // тут следует понимать, из правила var - видимость в своей фциональной области видимости, она никак не влияет на функцию выше.
//   }
//   two() // не на что не влияет, digit со значением 100 будет локальным в фции two
//   return digit // 50 на выходе
// }
// log(one())

// курьезы var
// function sum() {
//   var a = 777;
//   var b = 888;
//   if (true) {
//     var a = 5; // у var нет блочной ОВ, поэтому a и b перезапишуться
//     var b = 10;
//   }
//   log(a + b);

//   var a = 777;
//   var b = 888;
//   if (true) {
//     let a = 5; // с объявлением через let все иначе, мы будем находится только в блоке if и не сможем перезаписать a и b
//     let b = 10;
//   }
//   log(a + b);
// }
// sum()

// function cycleFor() {
//   var arr = [1, 2, 3];
//   var lengthArr = arr.length;
//   for (var arr = 0; arr < lengthArr; arr++) {
//     // something
//   }
//   // мы создали цикл для условного взаимодействия с массивом, но проблема в том что for - это тоже блочная ОВ, по сути мы просто перезаписали значение переменной arr на 0 и вернули итог выполнения задачи
//   log(arr);

//   var arr = [1, 2, 3];
//   var lengthArr = arr.length;
//   for (let arr = 0; arr < lengthArr; arr++) {
//     // something
//   }
//   // с let такой проблемы не будет, оно существует только в блоке ОВ цикла
//   log(arr);
// }
// cycleFor()

// function rewrite() {
//   // var digit = 500;
//   // if (digit >= 500) {
//   //   var digit = 100;
//   // }
//   // // здесь мы просто перезаписываем значение с помощью объявления var с таким же именем
//   // log(digit)

//   // let digit = 500;
//   // if (digit >= 500) {
//   //   let digit = 100;
//   // }
//   // // С let мы не сможем так сделать, 1 - будет ошибка, 2 - let уже имеет разные ОВ
//   // log(digit)

//   // let digit = 500;
//   // if (digit >= 500) {
//   //   digit = 100;
//   // }
//   // // мы можем изменить значение с помощью цепи областей видимости(Scope Chain), то есть мы просто ищем задекларированное имя digit по чепочке ОВ чтобы его перезаписать
//   // log(digit)
// }
// rewrite()

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// В чем разница между методами Object.freeze и Object.seal?
/*
Object.freeze это статический метод, замораживает объект: это значит, что он предотвращает добавление новых свойств к объекту, удаление старых свойств из объекта и изменение существующих свойств или значения их атрибутов перечисляемости, настраиваемости и записываемости.
Примечание, если объект заморожен - его невозможно разморозить или привести в исходное состояние

Object.seal это статический метод, запечатывает объект, предотвращая добавление новых свойств к объекту и делая все существующие свойства не настраиваемыми. Значения представленных свойств всё ещё могут изменяться, поскольку они остаются записываемыми. Оно делает все свойства объекта фиксированными и неизменными.
Попытки удаления или добавления свойств к запечатанному объекту, либо преобразования свойств данных в свойства доступа и наоборот, будут терпеть неудачу, либо молча, либо с выбрасыванием исключения TypeError

https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/seal
*/
// Пример 1 - Следует раскомментировать, для правильной работы всех примеров
// let obj = {
//   prop: 'something',
//   method: function() {
//     return this.prop;
//   },
//   otherObj: {
//     otherObjProp: 'something',
//     otherMethod: function() {
//       return this.otherObjProp;
//     }
//   },
//   arr: [1, 2, 3],
// }
// delete obj.prop // все как обычно, мы можем делать все что угодно с этим объектом
// obj.prop = 'other'
// log(obj.prop)
// log(obj.method())

// Пример 2 Object.freeze
// Object.freeze(obj)
// log(Object.isFrozen(obj)) // проверяем на заморозку
// Object.defineProperty(obj, 'otherProp', { value: 17 }); // мы не можем добавить свойство
// delete obj.prop // ошибки нет, но ничего не удаляется и не изменяется
// obj.prop = 'other'
// log(obj.prop)
// log(obj.method())

// Пример 3 Но есть особенность, заморозка неглубокая
// Object.freeze(obj)
// log(Object.isFrozen(obj))
// obj.arr.push(55); // в замороженный объект мы смогли изменить значение другого объекта (Array)
// // Почему мы смогли это сделать? Все просто все правила заморозки действуют только на тот объект, который был заморожен, если мы хотим заморозить вложенные объекты, придется воспользоваться Глубокой заморозкой
// obj.arr.length = 0; // можно даже очистить весь массив
// obj.otherObj.otherObjProp = 'rename prop'; // переименовал свойство во внутреннем объекте
// log(obj.otherObj)
// log(obj)

// Пример 4 Глубокая заморозка
// Чтобы сделать объект obj полностью неизменяемым, замораживаем каждый объект в объекте obj.
// Для этого воспользуемся этой функцией.
// function deepFreeze(obj) {
//   // Получаем имена свойств из объекта obj
//   let propNames = Object.getOwnPropertyNames(obj); // возвращает массив со всеми свойствами
//   // Замораживаем свойства для заморозки самого объекта
//   propNames.forEach(name => {
//     let prop = obj[name];
//     // Заморозка свойства prop, если оно объект
//     if (typeof prop == 'object' && prop !== null)
//       deepFreeze(prop); // работа настроена в виде рекурсии
//   });

//   // Заморозить сам объект obj (ничего не произойдёт, если он уже заморожен)
//   return Object.freeze(obj);
// }
// deepFreeze(obj)
// obj.arr.push(55); // как в примере выже уже не получится, объект arr тоже заморожен
// obj.otherObj.otherObjProp = 'rename prop';
// log(obj.otherObj.otherMethod()) // не смог переименовать, но возвратил без ошибки

// Пример 5 Object.seal()
// Object.seal(obj)
// log(Object.isSealed(obj)) // obj запечатан
// obj.prop = 'other'; // сущетвующее свойство изменяется
// delete obj.prop // но не удаляется
// obj.otherProp = 55; // ощибки нет, но это новое свойство не добавилось
// Object.defineProperty(obj, 'otherProp', { value: 55 }); // здесь уже ошибка нерасширяемости объекта
// log(obj.otherProp)
// log(obj.prop)

// Пример 6 Особенность такая же как у Object.freeze - правила не действуют на внутренние объекты
// Object.seal(obj)
// log(Object.isSealed(obj)) // obj запечатан
// delete obj.otherObj.otherObjProp // можно удалить это свойство (Напоминаю в запечатанном obj такое не работает)
// log(obj.otherObj.otherObjProp)

// Пример 7 Глубокая запечатка
// function deepSeal(obj) {
//   // Получаем имена свойств из объекта obj
//   let propNames = Object.getOwnPropertyNames(obj); // возвращает массив со всеми свойствами
//   // Замораживаем свойства для заморозки самого объекта
//   propNames.forEach(name => {
//     let prop = obj[name];
//     // Заморозка свойства prop, если оно объект
//     if (typeof prop == 'object' && prop !== null)
//       deepSeal(prop); // работа настроена в виде рекурсии
//   });

//   // Заморозить сам объект obj (ничего не произойдёт, если он уже заморожен)
//   return Object.seal(obj);
// }
// deepSeal(obj)
// log(Object.isSealed(obj))
// delete obj.otherObj.otherObjProp // удалить это свойство невозможно из за того что объект с ним запечатан
// log(obj.otherObj.otherObjProp)

// Итог: в замороженный объект (Object.freeze) нельзя добавить новые свойства, удалить старые свойства и изменять их. Но внутренние объекты могут работать в обычном виде, если не применять Глубокую заморозку.
// в запечатанном объект (Object.seal) нельзя добавить новые свойства, удалить существующие, но можно изменять существующие. Но внутренние объекты могут работать в обычном виде, если не применять Глубокую запечатку.

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Коллекции Map и Set
//
// https://learn.javascript.ru/map-set
//
// Map – это коллекция ключ/значение, как и Object. Но основное отличие в том, что Map позволяет использовать ключи любого типа.
//
//
// Методы и свойства:
//
// new Map() – создаёт коллекцию.
// map.set(key, value) – записывает по ключу key значение value.
// map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
// map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
// map.delete(key) – удаляет элемент по ключу key.
// map.clear() – очищает коллекцию от всех элементов.
// map.size – возвращает текущее количество элементов.
//
//// Перебор Map
//
// С помощью for of мы можем перебрать эту коллекцию
//
// Пример 1 newMap.entries() перебирает ключи и значение
// for (let all of newMap.entries()) {
//   log(all)//[ключ,значение], ['boolean', true]
// }
// Пример 2 newMap.values() перебирает значения
// for (let values of newMap.values()) {
//   log(values)//значение, true
// }
// Пример 3 newMap.keys() перебирает ключи
// for (let key of newMap.keys()) {
//   log(key)//ключ, boolean
// }
//
// Map имеет встроенный метод forEach, схожий со встроенным методом массивов Array
//
// Пример 4 newMap.forEach((value, key, map) => {
//  log(`${key}: ${value}`); // ключ: значение и так далее
// });
//
// Пример 1 map.set(key,value)
//
// let newMap = new Map();
// newMap.set('ключ', 'значение');
// newMap.set('boolean', true);
//
// Пример 2 map.get(key)
//
// log(newMap.get('ключ')) // выдается значение по ключу , то есть 'значение'
// log(newMap.get('boolean')) // выдается значение по ключу , то есть true
//
// Пример 3 map.has(key)
//
// log(newMap.has('ключ')) // выдается значение true, т.к этот ключ существует
// log(newMap.has('123')) // выдается значение false, т.к этот ключ не существует
//
// Пример 4 map.delete(key)
//
// log(newMap.delete('ключ')) // удаляет пару ключ-значение
// log(newMap.has('ключ')) // будет false, т.к ключ отсутсвует
//
// Пример 5 map.clear(key)
//
// log(newMap.clear()) // очищает полностью коллекцию
//
// Пример 6 map.size(key)
//
// log(newMap.size) // возвращает текущее количество элементов.
//
// Map из Object
// let obj = {
//   name: "John",
//   age: 30
// };

// let map = new Map(Object.entries(obj)); // Здесь Object.entries возвращает массив пар ключ-значение: [ ["name","John"], ["age", 30] ].

// Получаем массив пар ключ-значение: [ ["name","John"], ["age", 30] ].
//
// Object из Map
//
// let map = new Map();

// map.set('banana', 1);
// map.set('orange', 2);
// map.set('meat', 4);

// let obj = Object.fromEntries(map.entries());
// Получаем {banana: 1, orange: 2, meat: 4}
//
// Set - это особый вид коллекции: «множество» значений (без ключей), где каждое значение может появляться // только один раз.
//
//new Set(iterable) – создаёт Set, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый Set.
// set.add(value) – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
// set.delete(value) – удаляет значение, возвращает true, если value было в множестве на момент вызова, иначе false.
// set.has(value) – возвращает true, если значение присутствует в множестве, иначе false.
// set.clear() – удаляет все имеющиеся значения.
// set.size – возвращает количество элементов в множестве.
//
// Перебор объекта Set
//
// let set = new Set(["апельсин", "яблоко", "банан"]);
//
// Пример 1 for (let value of set) log(value);
//
// то же самое с forEach:
// Пример 2 set.forEach((value, valueAgain, set) => {
//   alert(value);
// });
//
// Пример 1 set.add(value)
//
// let set = new Set([1,2,3,4,5,5,6,7,8,9,9,7,2])
// set.add(10) // Добавляем 10 в нашу коллекцию
// for (let value of set) log(value); Выводим по-очереди значение в коллекции Set от 1 до 10
//
// Пример 2 set.delete(value)
//
// set.delete(10)
//
// Теперь у нас коллекция Set равна значениям от 1 до 9
//
// Пример 3 set.has(value)
//
// set.has(9) // возвратит true, т.к значение существует\
// set.delete(9)// удаляем значение
// set.has(9) // false, т.к значение удаленно
//
// Пример 4 set.clear()
//
// Теперь у нас set пустая коллекция
//
// Пример 5 set.size
//
// let set = new Set([1,2,3,4,5,5,6,7,8,9,9,7,2])
// log(set.size) //  Узнаем размер коллекции, оно равно 9 
//
//
// Перебор Map и Set всегда осуществляется в порядке добавления элементов, так что нельзя сказать, что это – // неупорядоченные коллекции, но поменять порядок элементов или получить элемент напрямую по его номеру нельзя.


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Почему функции в JS называют объектами первого класса (First-class Objects)?
/*
Объектами первого класса в контексте конкретного языка программирования называются элементы, которые могут быть переданы как параметр, возвращены из функции, присвоены переменной.
В языках программирования существует понятие "объекты первого рода (или класса)". Им обозначают элементы, которые могут быть переданы в функции, возвращены из функций и присвоены переменным (или константам). К таким элементам относятся любые данные, например числа, строки, массивы или логические значения.
Объектами первого рода может быть не только то, что мы привыкли именовать словом "данные", но и любая конструкция языка, например, функции. В JavaScript функции это объекты первого рода.
В частности, это означает, что язык поддерживает создание новых функций во время выполнения программы, хранение их в структурах данных, передачу их в качестве аргументов другим функциям и возврат их в качестве значений других функций.

Функция - это экземпляр типа объекта
Функция может иметь свойства и имеет ссылку на свой метод конструктора
Вы можете сохранить функцию в переменной
Вы можете передать функцию в качестве параметра другой функции
Вы можете вернуть функцию из функции
Функция возвращает замыкание
Функция принимает коллбек

https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82_%D0%BF%D0%B5%D1%80%D0%B2%D0%BE%D0%B3%D0%BE_%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%B0
https://ru.coursera.org/lecture/golang-webservices-1/funktsiia-kak-obiekt-piervogho-klassa-anonimnyie-funktsii-MIqhx
https://developer.mozilla.org/ru/docs/Glossary/First-class_Function
*/
// Пример 1 сохранить функцию в переменной (константе)
// const funcEx = () => 'Something';
// const funcEx2 = function() { return 'Another Something' };
// log(funcEx()) // мы обращаемся к переменной как к фции
// log(funcEx2())

// Пример 2 функцию из функции
// const funcInner = () => {
//   return function sum(a, b) {
//     return a + b;
//   }
// }
// const sum = funcInner(); // наша константа - это возвращенная фция из фции funcInner
// log(sum(5, 5)) // соответственно мы можем передать аргументы в константу

// Пример 3 функция возвращает замыкание
// function init() {
//   let name = "Mozilla"; // name - локальная переменная, созданная в init
//   function displayName() { // displayName() - внутренняя функция, замыкание
//       log(name); // displayName() использует переменную, объявленную в родительской функции
//   }
//   displayName();
// }
// init();

// Пример 4 принимает коллбек, функция в качестве параметра другой функции
// function doHomework(subject, callback) {
//   log(`Starting my ${subject} homework.`);
//   callback();
// }
// doHomework('math', function() {
//   log('Finished my homework');
// });
//
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Что такое callback-функция? 
//
//Callback-функция - это функция которая была передена , как аргумент в вызове другой функции и будет  выполнена, когда основая функция будет выполнена.
// 
// https://ru.hexlet.io/blog/posts/javascript-what-the-heck-is-a-callback
// https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
//
// Пример:
//
// function check(elem,callback) {  
//   log(`Вы выбрали ${elem}`)
//  setTimeout(() => {
//    callback()  // -------> Для наглядности был применен setTimeout , чтобы было более понимания, как это 
//  }, 1000)  // работает , то есть в начале пройдет вся основаня функция , а потом в конце выполнится наш
//  }  //callback  ---____
//                       /  
//                      V
//  check("Золото", function() {  -----> как мы видим, мы передали функцию, как аргумент
//     console.log('Это callback')
//  })
//
// Если мы хотим использовать множество callbackov , то лучше использовать для этого Promise.
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Что такое чистая функция?
//
// Чистая функция - та функция, которая взаимодействует только с заданными параметрами , то есть не используя других методов и переменных
//
// https://habr.com/ru/post/437512/
// 
// Пример чистой функции:
//
// function check(a,b) {
//  return a * b
// }
//
// check(2,4) // вернет 12
//
// Пример нечистой функции
//
// let c = 10
//                                   
// function check(a,b) {   //   
//    return a + b + c     // Как  мы видим в функции используется стороння переменная 'c', которая не входит в
// }                    // параметры функции  и называется нечистой функцией
// check(3,6)
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Почему typeof null возвращает object?
// 
// https://habr.com/ru/post/200664/
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Default_parameters
//
// //Все JavaScript-программисты давно привыкли к тому, что typeof null === 'object'; // true, хотя фактически // null — примитивное значение. Многие знают, что это баг, и лично Брэндан Айк это признает. Этот баг, //вероятно, никогда не будет исправлен из-за необходимости сохранения обратной совместимости существующего //кода с новыми версиями языка.

// Интересна история того, как же это получилось. Она восходит корнями к первой версии языка, а именно — к  //тому факту, что значения переменных хранились в 32-битных ячейках в следующем формате:
// 29-31 бит: само значение;
// 1-3 бита: метка типа данных;

// Было всего пять вариантов метки типа:
// 000: object;
// 1: integer;
// 010: double;
// 100: string;
// 110: boolean;

// Соответственно, если младший бит был равен единице, то оставшийся 31 бит интерпретировался как integer. Если 0 — то тип определялся в зависимости от значения следующих двух бит.

// Также было два специальных зарезервированных значения:

// undefined (JSVAL_VOID) — целое –2 в 30 степени
// null (JSVAL_NULL) — указатель на NULL (machine code NULL pointer), то есть, метка объекта и ссылка на то, // что его численное представление равно нулю.
//
// Так и вышло, что typeof стал определять null как object — он проверял метку типа, которая сообщала ему, что // null — это не что иное, как object.
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Что такое параметры по умолчанию (Default Parameters)?
//                 _______________________
//                |      |               |
//                V      V               |
// function add(a = 0, b = 0){           |
//   return a + b        // то есть мы можем видеть, что присваиваются значение по умолчанию в парамерты 
// }                    // которын не были переданы, как аргумент при вызове функции a == 1, b == 0
// log(add(1))