---
title: Filtering Array of objects
date: "2021-06-18T12:03:01.284Z"
tags:
- js
- array
- filter
---

# How to filter array on multiple fields

In this blog, we will see one way of filtering array on multiple fields.

let's say we have an of objects that we need to filter
```js
const heroes = [
    {name: "Batman", franchise: "DC", status: "active"},
    {name: "Ironman", franchise: "Marvel", status: "inactive"},
    {name: "Thor", franchise: "Marvel", status: "active"},
    {name: "Superman", franchise: "DC", status: "unavailable"}
];
```
## Filtering on one field
If we want to filter heroes array on any condition, for example, belongs to franchise: "DC". It is much straight forward process.
```js
const filterOn = {franchise: "DC"}
const filteredHeroes = heroes
  .filter((hero) => hero.franchise === filterOn.franchise); (1)

//output: 
// [{name: "Batman", franchise: "DC", status: "active"},
// {name: "Superman", franchise: "DC", status: "unavailable"}]
```
1. Filter will give us all the heroes that belongs to "DC" franchise.

## Filtering on multiple fields
Let's say we want to now filter based on multiple fields. For example show all heroes that belongs to "DC" and in active status

```js
const filterOn = {franchise: "DC", status: "active"}

const filteredHeroes = heroes
    .filter(
      (hero) => hero.franchise === filterOn.franchise && hero.status === filterOn.status);

//output: 
// [{name: "Batman", franchise: "DC", status: "active"}]
```
The above solution works if you always have set of known fields or few fields. What if we have 4 or 5 or more fields to filter on. This solution won't scale. Another solution would to make use of `Object.keys` and arrays `every` method.
```js
const filteredHeroes = heroes (3)
    .filter((hero) => Object
      .keys(filterOn) (1)
      .every((k) => filterOn[k] === hero[k])) (2);

//output: 
// [{name: "Batman", franchise: "DC", status: "active"}]
```

1. `Object.keys` will return the `Array` of keys of `filterOn` object
2. `every` will check if all conditions for every existing is `true`
3. `filteredHeroes` will have the same output as above

The only difference in previous and this method is that even though previous method is much clear, but it does not scale if we add or remove values from our `filterOn` object.
This method will work even for single value in the object.
