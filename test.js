//Есть множество (массив, где порядок не важен) целых чисел в диапазоне от 1 до 300. 
//Количество чисел - до 1000. Напишите функцию сериализации / десериализации в строку, чтобы итоговая строка была компактной.
//Цель задачи - максимально сжать данные относительно простой сериализации без алгоритма сжатия (хотя бы 50% в среднем). 
//Сериализованная строка должна содержать только ASCII символы. Можно использовать любой язык программирования.
//Вместе с решением нужно прислать набор тестов  - исходная строка, сжатая строка, коэффициент сжатия.


//Сериализация
function serialize(data) {
	let serialized = '';
	for (let num of data) {
		serialized += String.fromCharCode(num);
	}
	return serialized;
}

//Десериализация
function deserialize(serialized) {
	const data = [];
	let i = 0;
	while (i < serialized.length) {
		data.push(serialized.charCodeAt(i));
		i++;
	}
	return data;
}


// Тесты
const numbers_2 = [];
const numbers_3 = [];
const numbers_xxx = [];
const numbers_500 = [];
const numbers_1000 = [];

for (let i = 1; i <= 500; i++) {
	numbers_500.push(Math.floor(Math.random() * 300));
}
for (let i = 1; i <= 1000; i++) {
	numbers_1000.push(Math.floor(Math.random() * 300));
}

for (let i = 10; i <= 99; i++) {
	numbers_2.push(i);
}
for (let i = 100; i <= 300; i++) {
	numbers_3.push(i);
}
for (let i = 1; i <= 300; i++) {
	numbers_xxx.push(i);
	numbers_xxx.push(i);
	numbers_xxx.push(i);
}
const tests = [
	[1, 2, 3, 4, 5],
	Array.from({ length: 50 }, (_, i) => i + 1),
	Array.from({ length: 100 }, (_, i) => i + 1),
	numbers_500,
	numbers_1000,
	Array.from({ length: 20 }, () => 1),
	numbers_2,
	numbers_3,
	numbers_xxx,
];

function equal(arr1, arr2) {
	for(let i = 0; i < arr1.length; i++) {
		if(arr1[i] !== arr2[i])
			return false
	}
	return true;
}
//Примеры тестов: простейшие короткие, случайные - 50 чисел, 100 чисел, 500 чисел, 1000 чисел, граничные - все числа 1 знака, 
//все числа из 2х знаков, все числа из 3х знаков, каждого числа по 3 - всего чисел 900.
// UNICODE - 2 bytes; Number - 8 bytes;
console.log("------------------------------------------START------------------------------------------")
for (let test of tests) {
	const test_weight = test.length * 8;
	const serialized = serialize(test);
	const serialized_weight = (new Blob([serialized])).size;
	const deserialized = deserialize(serialized);
	const deserialized_weight = deserialized.length * 8;
	const percentage = serialized_weight / test_weight * 100;
	console.log(`Original (weight: ${test_weight} bytes):\n`, test.length);
	console.log(`Serialized (weight: ${serialized_weight} bytes):\n`, serialized.length);
	console.log(`Deserialized (weight: ${deserialized_weight} bytes):\n`, deserialized.length);
	console.log(`Weight percentage after serialization: ${percentage.toFixed(1)}%\n`);
	console.log(`Compression ratio: ${(test_weight/serialized_weight).toFixed(1)}`)

	console.log("BEFORE: ", test);
	console.log("AFTER: ", deserialized);
	console.log("Does it equal: ", equal(test, deserialized));
	console.log("------------------------------------------");
}
console.log("-------------------------------------------END-------------------------------------------")