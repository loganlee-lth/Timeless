-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);


INSERT INTO "public"."product"
  ("priceId", "name", "shortDescription", "longDescription", "price", "category", "inventoryQuantity", "imageUrl", "createdAt")
VALUES
  ('price_1Njen1BGcuvv6iU68LTlLkzH', 'Slim-fit T-shirt', 'White', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 1999, 't-shirt', 5, 'https://i.imgur.com/i1NPNle.jpg', now()),
  ('price_1NjfwKBGcuvv6iU6jTIWhHtC', 'Slim-fit T-shirt', 'Black', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 1999, 't-shirt', 5, 'https://i.imgur.com/qov7H6j.jpg', now()),
  ('price_1NjfxpBGcuvv6iU6xc6ixlY9', 'Slim-fit T-shirt', 'Navy', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 1999, 't-shirt', 5, 'https://i.imgur.com/TysF9hN.jpg', now()),
  ('price_1NjfypBGcuvv6iU6vILbE4UM', 'Slim-fit T-shirt', 'Grape', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 1999, 't-shirt', 5, 'https://i.imgur.com/Ut93OLL.jpg', now()),
  ('price_1Njg03BGcuvv6iU6DCx6smGe', 'Slim-fit T-shirt', 'Red', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 1999, 't-shirt', 5, 'https://i.imgur.com/kuv0snK.jpg', now()),
  ('price_1Njg0xBGcuvv6iU6ldnT3g6D', 'Slim-fit T-shirt', 'Yellow', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 1999, 't-shirt ', 5, 'https://i.imgur.com/45pHxRc.jpg', now()),
  ('price_1NdoTmBGcuvv6iU6VFysDVnU', 'Slim-fit polo shirt', 'White', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 2599, 'polos', 5, 'https://i.imgur.com/FYklSCg.jpg', now()),
  ('price_1Nds0MBGcuvv6iU66GMoDGBK', 'Slim-fit polo shirt', 'Black', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 2599, 'polos', 5, 'https://imgur.com/p5bg3lJ.jpg', now()),
  ('price_1Nds29BGcuvv6iU62b7cKnmw', 'Slim-fit polo shirt', 'Green', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 2599, 'polos', 5, 'https://imgur.com/ffzrnyJ.jpg', now()),
  ('price_1Njg4jBGcuvv6iU6AAjUyuDy', 'Slim-fit crew-neck sweater', 'Navy', 'With the finest available merino at its base, it’s a piece honed down to the very fiber, achieving just the right balance between softness on the body and edge to the eye.', 5499, 'sweater', 5, 'https://i.imgur.com/GD5XaWE.jpg', now()),
  ('price_1NjgKeBGcuvv6iU6MHCUrjZ5', 'Slim-fit crew-neck sweater', 'Green', 'With the finest available merino at its base, it’s a piece honed down to the very fiber, achieving just the right balance between softness on the body and edge to the eye.', 5499, 'sweater', 5, 'https://i.imgur.com/Pb9CigI.jpg', now()),
  ('price_1NjgLnBGcuvv6iU6SrxzSCzl', 'Slim-fit crew-neck sweater', 'Blue', 'With the finest available merino at its base, it’s a piece honed down to the very fiber, achieving just the right balance between softness on the body and edge to the eye.', 5499, 'sweater', 5, 'https://i.imgur.com/Qf1397u.jpg', now()),
  ('price_1NjgMrBGcuvv6iU62xogqBoQ', 'Slim-fit crew-neck sweater', 'Charcoal', 'With the finest available merino at its base, it’s a piece honed down to the very fiber, achieving just the right balance between softness on the body and edge to the eye.', 5499, 'sweater', 5, 'https://i.imgur.com/0BD2OYm.jpg', now()),
  ('price_1Nds6XBGcuvv6iU6RoXy3uQf', 'Tapered fit trousers', 'Walnut', 'The fabric is woven using a certified process that ensures worker safety, respect for the environment and minimal use of harmful chemicals at all stages of production.', 3499, 'trousers', 5, 'https://imgur.com/A6S2kvQ.jpg', now()),
  ('price_1Nds3rBGcuvv6iU6feqHKy7v', 'Tapered fit trousers', 'Black', 'The fabric is woven using a certified process that ensures worker safety, respect for the environment and minimal use of harmful chemicals at all stages of production.', 3499, 'trousers', 5, 'https://imgur.com/qzTEkv2.jpg', now());
