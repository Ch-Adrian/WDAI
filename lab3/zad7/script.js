let response = fetch("http://localhost:3000/cities")
const container = document.querySelector("section")

response.then(res =>{
    cities = res.json()
    return cities;
}).then(data =>{
    container.innerHTML += `<br><span>Podpunkt a):</span><br><br>`;
    data.forEach( obj =>{
        if(obj.province == "małopolskie")
        container.innerHTML += `<span>${obj.name}</span><br>`;
    })
    return data
}).then(data =>{
    container.innerHTML += `<br><span>Podpunkt b):</span><br><br>`;
    data.forEach( obj =>{
        if(/[a]{1}[^a]*[a]{1}/.test(obj.name))
        container.innerHTML += `<span>${obj.name}</span><br>`;
    })
    return data
}).then(data =>{
    container.innerHTML += `<br><span>Podpunkt c):</span><br><br>`;
    const arr = []
    
    data.forEach( obj => {
    	arr.push({"name":obj.name, "density":obj.dentensity/obj.area})
    });
    
    arr.sort(function(a,b){return a.density < b.density})
    container.innerHTML += `<span> ${arr[4].name}</span>`
    return data;
}).then(data =>{
	container.innerHTML += `<br><span>Podpunkt d):</span><br><br>`;
	
	data.forEach( obj => {
		if(obj.people > 100000){
			container.innerHTML += `<span> ${obj.name}city</span><br>`
			}
	})
	return data;	
}).then(data =>{
	container.innerHTML += `<br><span>Podpunkt e):</span><br><br>`;
	
	let below = 0;
	let above = 0;
	
	data.forEach( obj => {
		if(obj.people > 80000){
			above += 1;
		}
		else{
			below += 1;
		}
	})

	if(above > below){
		container.innerHTML += `<span> Miast z mieszkancami powyzej 80000 jest: ${above}</span><br>`
		container.innerHTML += `<span> Miast z mieszkancami ponizej 80000 jest: ${below}</span><br>`
		container.innerHTML += `<span> Miast z mieszkancami powyzej 80000 jest wiecej.</span><br>`
	}
	else if(above == below){
	container.innerHTML += `<span> Miast z mieszkancami powyzej 80000 jest: ${above}</span><br>`
		container.innerHTML += `<span> Miast z mieszkancami ponizej 80000 jest: ${below}</span><br>`
		container.innerHTML += `<span> Miast z mieszkancami powyzej 80000 jest tyle samo co miast z mieszkancami ponizej 80000.</span><br>`
	}
	else{
		container.innerHTML += `<span> Miast z mieszkancami powyzej 80000 jest: ${above}</span><br>`
		container.innerHTML += `<span> Miast z mieszkancami ponizej 80000 jest: ${below}</span><br>`
		container.innerHTML += `<span> Miast z mieszkancami powyzej 80000 jest mniej.</span><br>`
	}
	return data;
}).then( data => {
	container.innerHTML += `<br><span>Podpunkt f):</span><br><br>`;
	
	let avg = 0;
	let nr = 0;
	
	data.forEach( obj => {
		if(/^[P]{1}/.test(obj.township)){
			nr += 1;
			avg += obj.area;
		}
	});
	
	let avge = avg/nr;
	container.innerHTML += `<span> Srednia powierzchnia miast z powiatow zaczynajacych sie na litere "P" wynosi: ${avge}</span><br>`; 
	return data;
})
