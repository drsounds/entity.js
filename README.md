# entity.js
An REST proxy object for JavaScript that can make web applications independent across REST API.

MAny web mashup are today querying different Web API. Entity JS is a project to create an abstraction layer between web apps and REST bridge,
so switching between vendor API is easier.

For example, an mashup that finds a song, could support different music services or an car lookup mashup could easy switch between car registry.

## Usage of an entity (with a resolver)

```JavaScript
var car = new Entity('car');
car.request('GET', {'model': 'a'}, null).then(function (result) {
    console.log(result); 
});
```