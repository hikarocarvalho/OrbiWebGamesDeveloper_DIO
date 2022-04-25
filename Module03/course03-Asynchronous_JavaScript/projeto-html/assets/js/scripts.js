const BASE_URL = 'https://thatcopy.pw/catapi/rest/';

const getCats = () => {
	return fetch(BASE_URL)
		.then((response)=>response.json())
		.then((json)=>json.webpurl)
		.catch((e)=>
			console.log(e.message)
		);
};

const loadImg = async() => {
	const img = document.getElementsByTagName('img')[0];
	img.src = await getCats();
};

loadImg();

const btn = document.getElementById('change-cat');
btn.addEventListener('click', loadImg);
