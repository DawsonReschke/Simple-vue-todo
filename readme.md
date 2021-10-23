Challenge Maker Todo List : 
	Front:{
		Button Create new TODO 
			Creates a new Window for specifiying data
			Button Submit
		UL
			LI V-for each todo 
				Display the name && timeTag of each todo
					if Hovered: dipslay the description
					if Pressed: Line Through the name
					
	},
	Back: { 
		CRUD API: {
			GET('/'): returns all of the TODOS in the db
			POST('/'): creates a new Entry to the DB if req.body
				passes schema validation
			DELETE('/:ID"): deletes the DB entry with {_id : id}
		},
		Schema: { 
			TODO = {
				title: string,
				description: string,
				timeTad: number,
				completed: bool,
				_id: date,
			}
		}
	}

