export class Book {
	constructor(name, autor, description, status){
		this.id = crypto.randomUUID();
		this.name = name;
	  	this.autor = autor;
	  	this.description = description
	  	this.status = status;
	}

	setStatus(status){
		this.status = status;
	}

}
