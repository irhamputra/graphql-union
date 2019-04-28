## Learn GraphQL Union

- Define a type in typeDefs

```
// define initial type definition
    type ValidationError {
        field: String
        message: String
    }

    type TimeoutError {
        reason: String
        seconds: Int
    }
```

- Create union
```
// use word union to create union object and return type definition. Pipe symbol means OR logical
union Error = ValidationError | TimeoutError
```

Define a union in resolver
```
Error: {
    // a union requires a __resvolveType and returns an obj
		__resolveType: (obj) => {
			if (obj.field) { // an obj has prop field
			    return 'ValidationError'
			}
			
			if (obj.reason) { // an obj has prop reason
				return 'TimeoutError'
			}
			
			return null
	    }
    }
```
