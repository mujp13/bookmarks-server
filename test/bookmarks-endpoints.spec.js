const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const fixtures = require('./bookmarks-fixtures')

describe('Bokmarks Endpoints', function() {
    let bookmarksCopy, db
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
      })
    })
  
    after('disconnect from db', () => db.destroy())
  
    // before('clean the table', () => db('bookmarks').truncate())

    //afterEach('cleanup', () => db('bookmarks').truncate())
      
    // TODO: refactor to use db when updating POST and DELETE
    // beforeEach('copy the bookmarks', () => {
    //   // copy the bookmarks so we can restore them after testing
    //     bookmarksCopy = store.bookmarks.slice()
    // })

    // TODO: refactor to use db when updating POST and DELETE
    // afterEach('restore the bookmarks', () => {
    //   // restore the bookmarks back to original
    //   store.bookmarks = bookmarksCopy
    // })

    describe('GET /bookmarks', () => {
      context(`Given no bookmarks`, () => {
        it(`responds with 200 and an empty list`, () => {
          return supertest(app)
            .get('/bookmarks')
            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
            .expect(200, [])
        })
      })

    describe('GET /bookmarks/:id', () => {
      context(`Given no bookmarks`, () => {
        it(`responds 404 whe bookmark doesn't exist`, () => {
          return supertest(app)
            .get(`/bookmarks/123`)
            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
            .expect(404, {
              error: { message: `Bookmark Not Found` }
            })
        })
      })
    })
  })
})