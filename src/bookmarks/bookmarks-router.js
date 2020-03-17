const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const { bookmarks } = require('../store')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

// GET /bookmarks returns a list of bookmarks
bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { url } = req.body;

    if (!url) {
      logger.error(`url is required`);
      return res
        .status(400)
        .send('Invalid data');
    }

  // get an id
  const id = uuid();

  const bookmark = {
    id,
    title,
    url,
    rating,
    desc
  };

  bookmarks.push(bookmark);

  logger.info(`List with id ${id} created`);

  res
    .status(201)
    .location(`http://localhost:8000/list/${id}`)
    .json({id});
})

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const list = bookmarks.find(li => li.id == id);

    // make sure we found a card
    if (!list) {
      logger.error(`List with id ${id} not found.`);
      return res
        .status(404)
        .send('List Not Found');
    }

    res.json(list);
  })
  .delete((req, res) => {
    const { id } = req.params;

    const listIndex = bookmarks.findIndex(li => li.id == id);

    if (listIndex === -1) {
      logger.error(`List with id ${id} not found.`);
      return res
        .status(404)
        .send('Not found');
    }

    bookmarks.splice(listIndex, 1);

    logger.info(`List with id ${id} deleted.`);
    res
      .status(204)
      .end();
  })

module.exports = bookmarksRouter