//при загрузке страницы - начальной будет являтсья та, которая указана дальше
//почему используем window.onload = function()?
//хз, ибо без нее - система выдает ошибку
//так же эта штука выполняет роль лаунчера и подгружает функции
//при загрузке страницы
window.onload = function(){
	document.querySelectorAll('.page')[0].style = 'display:block'
	WriteAllWords() //сразу при загрузке выгружаем на страницу все слова/дни
	LoadDefaultId() //загружаем defaultId, если таковой имееться в локальном хранилище
	GenerationAlgorithm() //загружаем алгоритм генерации слов при загрузке
}

//массив, который содержит слова и дни. В начале при загрузке 
//выводиться на страницу через window.onload > WriteAllWords()
let Words = {
    "0": [
        {
            "english": "appalled",
            "translate": "ужаснувшийся",
            "image": [
                {
                    "image_path": "https://thumbs.dreamstime.com/b/woman-put-hand-head-scared-shocked-frightened-appalled-skit-emotions-vector-illustration-eps-142758340.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "I was appalled when I saw the condition of the house."
                },
                {
                    "example_path": "I was appalled when I saw the condition of the house."
                }
            ]
        },
        {
            "english": "condolences",
            "translate": "соболезнования",
            "image": [
                {
                    "image_path": "https://st3.depositphotos.com/1017986/16025/i/450/depositphotos_160256040-stock-photo-red-roses-and-burning-candle.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "Please accept my condolences for your loss."
                }
            ]
        },
        {
            "english": "impart",
            "translate": "передавать",
            "image": [
                {
                    "image_path": "data:image/jpeg;base64,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"
                }
            ],
            "example": [
                {
                    "example_path": "The teacher imparted her knowledge to the students."
                }
            ]
        },
        {
            "english": "harnessed",
            "translate": "приручать, использовать",
            "image": [
                {
                    "image_path": "https://thumbs.dreamstime.com/b/harnessed-horse-horse-harness-leather-metal-products-handmade-harnessed-horse-horse-harness-leather-metal-products-108697132.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "He harnessed the power of the wind to generate electricity."
                }
            ]
        },
        {
            "english": "reluctantly",
            "translate": "неохотно",
            "image": [
                {
                    "image_path": "https://www.shutterstock.com/image-photo/tired-girl-reluctantly-rewrites-task-260nw-2044070114.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "She reluctantly agreed to help."
                }
            ]
        },
        {
            "english": "embodiment",
            "translate": "воплощение",
            "image": [
                {
                    "image_path": "https://cdn.tinybuddha.com/wp-content/uploads/2022/11/Meditating-sun-figure.png"
                }
            ],
            "example": [
                {
                    "example_path": "The statue was considered the embodiment of beauty."
                }
            ]
        },
        {
            "english": "conjure",
            "translate": "вызывать",
            "image": [
                {
                    "image_path": "https://thumbs.dreamstime.com/b/magician-hand-conjure-miracle-cylinder-wand-light-black-145436181.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "He could conjure images of his childhood with just a few words."
                }
            ]
        },
        {
            "english": "familiar",
            "translate": "знакомый",
            "image": [
                {
                    "image_path": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Witches%27Familiars1579.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "That face looks familiar."
                }
            ]
        },
        {
            "english": "stretching",
            "translate": "растяжка",
            "image": [
                {
                    "image_path": "https://novy.tv/wp-content/uploads/sites/96/2019/08/iStock-1076946698.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "I do stretching exercises every morning."
                }
            ]
        },
        {
            "english": "offspring",
            "translate": "потомок",
            "image": [
                {
                    "image_path": "https://cdn.langeek.co/photo/28093/original/child"
                }
            ],
            "example": [
                {
                    "example_path": "The lioness protected her offspring."
                }
            ]
        },
        {
            "english": "wield",
            "translate": "владеть, управлять",
            "image": [
                {
                    "image_path": "https://static.tvtropes.org/pmwiki/pub/images/dwield_4609.png"
                }
            ],
            "example": [
                {
                    "example_path": "He could wield a sword with great skill."
                }
            ]
        }
    ],
    "1": [
        {
            "english": "Affair",
            "translate": "дело, событие",
            "image": [
                {
                    "image_path": "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1492189374/articles/2014/01/14/what-turns-a-love-affair-into-a-relationship-that-actually-lasts/140113-goff-affair-tease_qh8ghn"
                }
            ],
            "example": [
                {
                    "example_path": "It's a complicated affair, and it will take time to sort out."
                },
                {
                    "example_path": "For two years they kept their affair secret."
                }
            ]
        },
        {
            "english": "Mistress",
            "translate": "любовница",
            "image": [
                {
                    "image_path": "https://www.gorteks.com.pl/eng_pl_Mistress-PPW-garter-belt-2201_7.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "He has a secret mistress that nobody knows about."
                }
            ]
        },
        {
            "english": "involuntary",
            "translate": "непроизвольный, невольный",
            "image": [
                {
                    "image_path": "https://i.dailymail.co.uk/1s/2021/04/27/01/42255810-0-image-a-2_1619483181459.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "She made an involuntary movement when she saw the spider."
                },
                {
                    "example_path": "He had an involuntary reaction to the loud noise."
                }
            ]
        },
        {
            "english": "holdbacks",
            "translate": "запоры, задержки",
            "image": [
                {
                    "image_path": "https://cdn.riastatic.com/photosnewr/dom/newbuild_photo/photo__196323-1200x800x90.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "There were some holdbacks in the construction project due to bad weather."
                },
                {
                    "example_path": "The holdbacks in the legal process caused a delay in the trial."
                }
            ]
        },
        {
            "english": "fumble",
            "translate": "дрожание, неловкое движение",
            "image": [
                {
                    "image_path": "https://cloudfront-us-east-1.images.arcpublishing.com/pmn/BFK7NZJ3UBFPZB4AKBZ65BJHHU.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "He made a fumble and dropped the ball."
                },
                {
                    "example_path": "Никто не может успешнее этого интересного молодого человека шарить под юбкой своей соседки."
                }
            ]
        },
        {
            "english": "humble",
            "translate": "скромный",
            "image": [
                {
                    "image_path": "https://images.thevoicemag.ru/upload/img_cache/44e/44ebf14165ed163fc3a17afca162bb05_ce_2367x1578x0x0.jpg"
                }
            ],
            "example": [
                {
                    "example_path": "Она скромный человек, который никогда не хвастается своими достижениями."
                }
            ]
        },
        {
            "english": "spectacular",
            "translate": "захватывающий, впечатляющий",
            "image": [
                {
                    "image_path": "https://www.trafalgar.com/real-word/wp-content/uploads/sites/3/2021/10/fireworks-display-nye.jpeg"
                }
            ],
            "example": [
                {
                    "example_path": "The fireworks display was truly spectacular."
                }
            ]
        }
    ]
}



// Перелистывание между страницами. 
// Чтобы добавить новую страницу
// требуется в классе menu скопировать
// новую кнопку, где Х в ChangePage(Х)
// это айди новой страницы.

// Далее требуется в классе pages
// просто перекопировать DIV.
// теги: #выборстраницы
function ChangePage(PageNumber) {

	i = 0;
	Pages = document.querySelectorAll('.page'); //берем все страницы, которые в DIV pages
	PageCounter = Pages.length; //берем длинну всех страниц

	//всем, без исключений страницам присваивается display: none, а потом, после цикла отображаем ту страницу, которую мы получили в функцию (PageNumber)
	while(i < PageCounter){
		Pages[i].style = 'display: none;'
		i++;
	}
	Pages[PageNumber].style = 'display: block;'

}




//при загрузке страницы через window.onload вызываем
//эту функцию, чтобы применить defaultId
//если таковое записано в ЛС
//переводим в Number() так как по умолчанию оно string
function LoadDefaultId (){

	if (localStorage.getItem('defaultId')) {

		defaultId = Number( localStorage.getItem('defaultId') );

	}

}

defaultId = 0; //стандарное значение по умолчанию из массива id, то есть по дефолту грузим самый первый день и набор слов

//изменяем английское слово и перевод слова
//получаем day,iteration и по этим данным находим массивы
function ChangeWord(day,iteration){

	Words[day][iteration].english = prompt('АНГЛИЙСКОЕ СЛОВО', Words[day][iteration].english)
	Words[day][iteration].translate = prompt('ПЕРЕВОД СЛОВА', Words[day][iteration].translate)

	WriteAllWords();

}
//работает ДВУМЯ (!!!) способами. Если нам известен ТОЛЬКО день
//то это означает, что пользователь нажал на кнопку
//с удалением всего дня, так как мы вкладываем в него только
//одно значение. Если нажата кнопка удалить слова
//то я указываю два значение. По этому принципу мы
//определяем, что удалить: день или конкретное слово
function DeleteIt (day,iteration){

	if (iteration == undefined) {

		delete Words[day];

	} else if (iteration !== undefined) {

		// delete Words[day][iteration];
		Words[day].splice(iteration, 1);

	}

	WriteAllWords();
	
}

//просто функция добавления нового слова в массив
//использую Words[day].length, чтобы получить
//значение, в которое впишу новое слово
//проще говоря это = последнее значение +1
function AddIt(day){

	Words[day][Words[day].length] = {
      english: prompt('АНГЛИЙСКОЕ СЛОВО', 'Word ' + Words[day].length), //по умолчанию записываем Word + итерация, чтобы автоматом выводилос Word 1, Word 2 и тд.
      translate: prompt('ПЕРЕВОД СЛОВА', 'Слово ' + Words[day].length), //тоже самое
      image: [],
      example: []
    };

    WriteAllWords();

}


//ИДЕЯ
//ИДЕЯ
//ИДЕЯ
//ИДЕЯ
//ИДЕЯ
//ИДЕЯ - через цикл выводить в алерт картинки/подсказки и спрашивать: удалить или нет. Если ОК то удалить, если нет идем дальше
//ИДЕЯ
//ИДЕЯ
//ИДЕЯ
//ИДЕЯ
//ИДЕЯ

// выбираем день, который будет применяться к системе. 
// Выбор происходит на странице с выводом всех дней. 
// По умолчанию значение = 0
// переводим в Number() так как по умолчанию оно string
function ChooseIt (choose){

	console.log(choose.parentElement.dataset.id)
	defaultId = Number(choose.parentElement.dataset.id)

	//кладем defaultId в ЛХ, чтобы потом использовать для выгрузки при загрузке страницы
	localStorage.setItem("defaultId", defaultId);

}




// функция, которая выводит на страницу все дни в массиве Words
// после этого мы будем выбирать, какой день мы хочем выбрать
// и соответственно, какие слова внутри этого дня будут
// все это дело мы выводит на страницу 1 (класс page)
function WriteAllWords(){

	// тут мы очищаем страницу, чтобы если мы обновим значения
	// массива, то у нас они не скапливались/дублировались
	document.querySelector('.words-array-page').innerHTML = '';

	PageWrite = document.querySelector('.words-array-page');
	i=0; //используем для подсчета дней
	y=0; //используем для подсчета итераций слов внутри дней
	WordsH1 = '';
	while(i < Object.keys(Words).length){ //Object.keys(Words).length = количество дней в объекте. Просто Words.length = НЕ работает

	
	// сча поясню, если использовать просто Words[1].length, то 
	// скрипт будет работать очень плохо. Почему? Если, например

	// есть массив [1, 23, 456], то при Words[2].length = оно выдаст
	// undefined, хотя по логике должно вывести 456. Поэтому, чтобы это 
	// обойти я использую Object.keys(Words)[2], который при таком же
	// условии (Words[2].length) - даст 456. Эта шняга просто
	// итерирует значения, какими бы они ни были, хоть 1,2,3, хоть
	// 456, 666, 999

	// Другими словами Words[Object.keys(Words)[2]].length = Words[456].length
	// Words[Object.keys(Words)[i]][y].english - тот же рофл
	// без этой фигни нельзя было бы нормально итерировать циклы
	// выглядит страшно, но ничего сложного нет

	// в ChangeWord вносим this, чтобы получить конкретно этот элемент
	// чтобы потом можно было его редактировать
	// в Object.keys(Words)[i] я вношу конкретные имена дней массовов
	// в y вношу конкретную итерацию слова внутри дня
	 Object.keys(Words)[i]
	while( y < Words[Object.keys(Words)[i]].length ){ 
		WordsH1 += '<h2 class="words-from-array-english">' + Words[Object.keys(Words)[i]][y].english + ' — ' +
		 Words[Object.keys(Words)[i]][y].translate + 
		'<button class="button change-word" onclick="ChangeWord(' + Object.keys(Words)[i] + ',' + y +')">Р</button>' +
		'<button class="button change-word" onclick="DeleteIt(' + Object.keys(Words)[i] + ',' + y +')">У</button>' + 
		'<button class="button" onclick="OpenModalWindow(' + Object.keys(Words)[i] + ',' + y +')">КП</button>' + 
		'</h2>';
		y++
	}


	// в Object.keys(Words)[i] я вношу конкретные имена дней массовов
	// если было бы просто i, то вместо вывода: 1, 34, 45, оно бы вывело
	// 1, 2, 3

	// WordsH1 я использую, так как если попытаться просто сделать цикл
	// внутри кода, то система просто шизонеться
	// массив таким образом, видимо, создавать нельзя.
	// в кнопку я пихаю Object.keys(Words)[i] чтобы по конкретному айди удалить день из массива
	PageWrite.insertAdjacentHTML('afterbegin', `<div class="words-from-array" data-id="` + Object.keys(Words)[i] + `">
		<h1 class="word-from-array-id">ID: ` + Object.keys(Words)[i] + `</h1>`
		 + WordsH1 + `
		 <button class="button word-button" onclick="ChooseIt(this)">Выбрать</button>
		 <button class="button word-button" onclick="DeleteIt(` + Object.keys(Words)[i] + `)">Удалить</button>
		 <button class="button word-button" onclick="AddIt(` + Object.keys(Words)[i] + `)">+</button>
		</div>` )


	i++

	//необходимо обнулить эти значения, чтобы каждый раз выводились
	//нужные объекты, а не все в сумме и в куче
	y = 0;
	WordsH1 = '';
	}

}


//функция открытия модального окна и ввода в него картинок и примеров
function OpenModalWindow(day,iteration){

	document.querySelector('.modal-window-content').innerHTML = '';
	document.querySelector('.modal-window').style = 'display: block;'

	ModalWindowContent = document.querySelector('.modal-window-content');

	images = '';
	examples = '';

	i = 0;
	y = 0;

	//создаем цикл. внутрь images пихаем все кантинки из массива по хтмл шаблону
	//потом, переменная images будет ниже вставлена в общий генерационный
	//блок ModalWindowContent.insertAdjacentHTML
	while( i < Words[day][iteration].image.length ){

		images += '<img class="modal-image" src="' + Words[day][iteration].image[i].image_path + '"></img>' +
		'<button class="button delete-image" onclick="DeleteImage('+ day + ',' + iteration + ',' + i + ')">Удалить</button>'
		;

		i++;

	}


	//повторяем тоже самое для примеров, смысл ровно тот же
	while( y < Words[day][iteration].example.length ){

		examples += '<h2 class="modal-example">' + Words[day][iteration].example[y].example_path + '</h2>' +
		'<button class="button" onclick="DeleteExample('+ day + ',' + iteration + ',' + y + ')">Удалить</button>' +
		'<button class="button" onclick="ChangeExample('+ day + ',' + iteration + ',' + y + ')">Редактировать</button>'
		;

		y++;

	}

	//выводим в модальное окно наши картинки и примеры по хтмл шаблону, дописываем day/iteration, чтобы
	//всегда можно было ориентироваться че-куда-какой конкретный элемент
	ModalWindowContent.insertAdjacentHTML('afterbegin', '<h1>Картинки:</h1>' + images  +
		'<br><button class="button" onclick="AddImage(' + day + ',' + iteration +')">К</button>' +
		'<br><h1>Примеры:</h1>' + examples +
		'<br><button class="button" onclick="AddExample(' + day + ',' + iteration +')">П</button>'
		);

	

}

//просто закрываем модальное окно, которое по умолчанию скрыто
//содержимое обнуляем через innerHTML, чтобы выводить на страницу
//все по новой, а не наслаивать всё в одну кучу
function CloseModalWindow(){

	document.querySelector('.modal-window-content').innerHTML = '';
	document.querySelector('.modal-window').style = 'display: none;'

}

//удаляем картинку по принципу удаления дней
//splice - после удаления конкретной картинки сдвигает
//остальные назад в списке по итерации
function DeleteImage(day,iteration,imageID){

	Words[day][iteration].image.splice(imageID, 1);

	OpenModalWindow(day, iteration)

}

//удаляем пример по принципу удаления дней
//splice - после удаления конкретного примера сдвигает
//остальные назад в списке по итерации
function DeleteExample(day,iteration,ExampleID){

	Words[day][iteration].example.splice(ExampleID, 1);

	OpenModalWindow(day, iteration)

}

//добавление картинки ровно по такому же принципу, как в AddIt(day), только выглядит немного сложнее
//использую Words[day][iteration].image.length, чтобы получить
//значение, в которое впишу картинку
//проще говоря это = итерация последней картинки +1

function AddImage(day,iteration){

	Words[day][iteration].image[Words[day][iteration].image.length] = {image_path: prompt('ССЫЛКА НА КАРТИНКУ')}; 

	OpenModalWindow(day,iteration);

}

//ровно тоже самое с примерами
function AddExample(day,iteration){

	Words[day][iteration].example[Words[day][iteration].example.length] = {example_path: prompt('ВВЕДИТЕ ПРИМЕР')}; 

	OpenModalWindow(day,iteration);

}


//меняем сам пример, вписываем в конкретный пример - промт, где стандартным значением является уже созданный промт
function ChangeExample(day,iteration,ExampleID){

	Words[day][iteration].example[ExampleID].example_path = prompt('ВВЕДИТЕ ПРИМЕР', Words[day][iteration].example[ExampleID].example_path)


	OpenModalWindow(day,iteration);

}

//добавляем день, ничего особенного
//Number( Object.keys(Words)[Object.keys(Words).length - 1] ) + 1 = последнее значение в массиве + 1
function DayAdd(){

	day = Number( Object.keys(Words)[Object.keys(Words).length - 1] ) + 1;

	//делаем проверки на случай, если ВСЕ дни удалены
	//и при добавление у нас было не NaN а 0
	//в JS нельзя использовать == NaN, поэтому нужно делать проверку через isNaN()
	if (isNaN(day)) {
		day = 0;
	}


	Words[day] = [{
      english: 'Word',
      translate: 'Слово',
      image: [],
      example: []
    }]

    WriteAllWords()

}


//функция чисто для удобства выводить весь массив в консоль
function GetWords(){
	console.log(Words)
}

//фунцкия, которая отвечает за вывод слов на страницу. тут всё, включая алгоритм (пока просто рандомное число)
//в PastNumber внутри GenerationAlgorithm() будем записывать последнее число, чтобы слова не повторялись 
//несколько раз подряд
let PastNumber;

function GenerationAlgorithm(){

	//получаем значения, куда всё будем выводить
	ContentPage = document.querySelector('.generate-content'); // див, куда будет выводиться результат

	//обнуляем все значения, и искрываем Перевод
	ContentPage.querySelector('.images').innerHTML = '';
	ContentPage.querySelector('.examples').innerHTML = '';
	ContentPage.querySelector('.show-content').style.display = 'none';

	//алгоритм пока просто рандомное число в зависимости от длинны слов в массиве
	random = Math.floor(Math.random() * Words[defaultId].length);

	if ( random == PastNumber && Words[defaultId].length > 1 ) {
		GenerationAlgorithm();
		return; //выход из функции, без ретурна функция будет идти дальше и картинки будут стакаться
	}

	PastNumber = random;

	//собираем все картинки и суем их все в ImageContent, а потом будем скопом выводить на страницу
	//делаем проверку, если у нас нет картинок, то не запускаем цикл
	i = 0;
	ImageContent = '';
	if (Words[defaultId][random].image[i] != 0) {
		while ( i < Words[defaultId][random].image.length ){
			ImageContent += '<img class="generate-image img-fluid" src="' + Words[defaultId][random].image[i].image_path + '"></img>'
			console.log('i = ' + i)
			i++;
		}
	}

	//тоже самое для примеров
	i = 0;
	ExampleContent = '';
	if (Words[defaultId][random].example[i] != 0) {
		while ( i < Words[defaultId][random].example.length ){
			ExampleContent += '<h2 class="generate-example">'+ Words[defaultId][random].example[i].example_path + '</h2>'
			i++;
		}
	}

	//выводим на страницу английские слова - перевод
	ContentPage.querySelector('.eng-tr-word').textContent = Words[defaultId][random].english
	ContentPage.querySelector('.translate').textContent = Words[defaultId][random].translate

	//выводим картинки и примеры
	ContentPage.querySelector('.images').insertAdjacentHTML('afterbegin', ImageContent )
	ContentPage.querySelector('.examples').insertAdjacentHTML('afterbegin', ExampleContent )

}


//по умолчанию .show-content - скрыт, при вызове GenerationAlgorithm() он тоже каждый раз скрывается
//через эту функцию по нажатию кнопки показываем содержимое
function Show(){
	ContentPage.querySelector('.show-content').style.display = 'block';
}