# Example of using firebase server REST API vs Angular Firebase modules

## REST API

Project base url is `https://firestore.googleapis.com/v1beta1/projects/`

To make request to database use

`base url + project id + database path + (collection/documents) + key + additional params if needed`

Key is required

Example

```
GET https://firestore.googleapis.com/v1beta1/projects/shop-c8009/databases/(default)/documents/products?key=AIzaSyBxGJfG2kmCldQeH2TV0mRsEW9QFJ8WYUk
```
will return all products.

To get speceific product use 
```
GET https://firestore.googleapis.com/v1beta1/projects/shop-c8009/databases/(default)/documents/products/1?key=AIzaSyBxGJfG2kmCldQeH2TV0mRsEW9QFJ8WYUk
```
will return product with id `1`

See more information here:
`https://firebase.google.com/docs/firestore/reference/rest/v1beta1/projects.databases.documents`

To update existing document use
```
PATCH https://firestore.googleapis.com/v1beta1/projects/shop-c8009/databases/(default)/documents/products/1?key=AIzaSyBxGJfG2kmCldQeH2TV0mRsEW9QFJ8WYUk&updateMask.fieldPaths=name

BODY 
{
    fields: {
        name: {
            stringValue: 'shirt'
        }
    }
}
```
where you need to pass which field need to be changed arguments with updateMask.fieldPath parameter. If the document exists on the server and has fields not referenced in the mask, they are left unchanged. Fields referenced in the mask, but not present in the input document, are deleted from the document on the server.
See `https://firebase.google.com/docs/firestore/reference/rest/v1beta1/projects.databases.documents/patch`

See also

Create new document `https://firebase.google.com/docs/firestore/reference/rest/v1beta1/projects.databases.documents/createDocument`

Delete new document `https://firebase.google.com/docs/firestore/reference/rest/v1beta1/projects.databases.documents/delete`
