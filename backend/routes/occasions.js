"use strict";
/** Routes for occasions. */
const express = require("express");
const router = new express.Router();
const Occasion = require("../models/occasion");

/** POST /{ occasion } => { occasion }
 *
 *   occasion should be { user_id, occasion_type, receiver_email, delivery_method, delivery_date, message, created_at }
 *
 *   Returns { id, user_id, occasion_type, receiver_email, delivery_method, delivery_date, message, created_at }
 *
 *   Authorization required: login
 */
router.post("/", async (req, res, next) => {
  const {
    user_id,
    occasion_type,
    receiver_email,
    delivery_method,
    delivery_date,
    message,
    created_at,
  } = req.body;

  try {
    const occasion = await Occasion.create({
      user_id,
      occasion_type,
      receiver_email,
      delivery_method,
      delivery_date,
      message,
      created_at,
    });

    res.status(201).send(occasion);
  } catch (err) {
    next(err);
  }
});

/** GET / => { occasions: [{ id, user_id, occasion_type, receiver_email, delivery_method, delivery_date, message, created_at }, ...] }
 *
 *   Authorization required: login
 */
router.get("/", async (req, res, next) => {
  try {
    const occasions = await Occasion.findAll({
      where: {
        user_id: req.query.userId,
      },
    });

    res.send(occasions);
  } catch (err) {
    next(err);
  }
});

/** GET /[id] => { occasion }
 *
 *  occasion is { id, user_id, occasion_type, receiver_email, delivery_method, delivery_date, message, created_at }
 *
 *   Authorization required: login
 */
router.get("/:id", async (req, res, next) => {
  try {
    const occasion = await Occasion.findByPk(req.params.id);

    res.send(occasion);
  } catch (err) {
    next(err);
  }
});

/** PUT /[id] { fld1, fld2, ... } => { occasion }
 *
 *   Updates occasion data.
 *
 *   fields can be: { occasion_type, receiver_email, delivery_date, message }
 *
 *  Authorization required: login
 */
router.put("/:id", async (req, res, next) => {
  try {
    const updatedOccasion = await Occasion.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.send(updatedOccasion);
  } catch (err) {
    next(err);
  }
});

/** DELETE /[id] { }
 *
 *   Deletes a occasion data.
 *
 *  Authorization required: login
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await Occasion.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
