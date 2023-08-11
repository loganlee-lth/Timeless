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
  ('price_1NdoTmBGcuvv6iU6VFysDVnU', 'Slim-fit polo shirt', 'White', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 2599, 'polos', 5, 'https://i.imgur.com/FYklSCg.jpg', now())
  -- ('Slim-fit polo shirt', 'Black', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 2500, 'polos', 5, 'https://imgur.com/p5bg3lJ.jpg', now()),
  -- ('Slim-fit polo shirt', 'Green', 'A crisp and cool garment that will accompany your daily outfits with comfort and performance.', 2500, 'polos', 5, 'https://imgur.com/ffzrnyJ.jpg', now()),
  -- ('Tapered fit trousers', 'Walnut', 'The fabric is woven using a certified process that ensures worker safety, respect for the environment and minimal use of harmful chemicals at all stages of production.', 5000, 'trousers', 5, 'https://imgur.com/A6S2kvQ.jpg', now()),
  -- ('Tapered fit trousers', 'Black', 'The fabric is woven using a certified process that ensures worker safety, respect for the environment and minimal use of harmful chemicals at all stages of production.', 5000, 'trousers', 5, 'https://imgur.com/qzTEkv2.jpg', now());
