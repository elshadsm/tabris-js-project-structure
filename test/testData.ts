import { JSONValue } from '@models/index';
import { Address } from '@models/Address';
import { Company } from '@models/Company';
import { User } from '@models/User';
import { Geo } from '@models/Geo';

export const testUsers = [new User({
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: new Address({
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: new Geo({
      lat: '-37.3159',
      lng: '81.1496'
    })
  }),
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: new Company({
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets'
  })
}),
new User({
  id: 4,
  name: 'Patricia Lebsack',
  username: 'Karianne',
  email: 'Julianne.OConner@kory.org',
  address: new Address({
    street: 'Hoeger Mall',
    suite: 'Apt. 692',
    city: 'South Elvis',
    zipcode: '53919-4257',
    geo: new Geo({
      lat: '29.4572',
      lng: '-164.2990'
    })
  }),
  phone: '493-170-9623 x156',
  website: 'kale.biz',
  company: new Company({
    name: 'Robel-Corkery',
    catchPhrase: 'Multi-tiered zero tolerance productivity',
    bs: 'transition cutting-edge web services'
  })
})];


export const testStringifiedUsers = '[{"id":1,"name":"Leanne Graham","username":"Bret","email":"Sincere@april.biz",\
"phone":"1-770-736-8031 x56442","website":"hildegard.org","address":{"street":"Kulas Light",\
"suite":"Apt. 556","city":"Gwenborough","zipcode":"92998-3874","geo":{"lat":"-37.3159","lng":"81.1496"}},\
"company":{"name":"Romaguera-Crona","catchPhrase":"Multi-layered client-server neural-net",\
"bs":"harness real-time e-markets"}},{"id":4,"name":"Patricia Lebsack","username":"Karianne",\
"email":"Julianne.OConner@kory.org","phone":"493-170-9623 x156","website":"kale.biz",\
"address":{"street":"Hoeger Mall","suite":"Apt. 692","city":"South Elvis","zipcode":"53919-4257",\
"geo":{"lat":"29.4572","lng":"-164.2990"}},"company":{"name":"Robel-Corkery",\
"catchPhrase":"Multi-tiered zero tolerance productivity","bs":"transition cutting-edge web services"}}]';

export const testJsonUsers: JSONValue = [{
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496'
    }
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets'
  }
}, {
  id: 4,
  name: 'Patricia Lebsack',
  username: 'Karianne',
  email: 'Julianne.OConner@kory.org',
  address: {
    street: 'Hoeger Mall',
    suite: 'Apt. 692',
    city: 'South Elvis',
    zipcode: '53919-4257',
    geo: {
      lat: '29.4572',
      lng: '-164.2990'
    }
  },
  phone: '493-170-9623 x156',
  website: 'kale.biz',
  company: {
    name: 'Robel-Corkery',
    catchPhrase: 'Multi-tiered zero tolerance productivity',
    bs: 'transition cutting-edge web services'
  }
}];
