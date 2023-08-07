set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."user" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."product" (
	"productId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"shortDescription" TEXT NOT NULL,
	"longDescription" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	"category" TEXT NOT NULL,
	"inventoryQuantity" integer NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT "product_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."shoppingCart" (
	"shoppingCartId" serial NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT "shoppingCart_pk" PRIMARY KEY ("shoppingCartId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."shoppingCartItems" (
	"shoppingCartItemsId" serial NOT NULL,
	"shoppingCartId" integer NOT NULL,
	"productId" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "shoppingCartItems_pk" PRIMARY KEY ("shoppingCartItemsId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."order" (
	"orderId" serial NOT NULL,
	"userId" integer NOT NULL,
	"total" DECIMAL NOT NULL,
	"orderDate" timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT "order_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."orderDetails" (
	"orderDetailsId" serial NOT NULL,
	"orderId" integer NOT NULL,
	"productId" integer NOT NULL,
	"name" TEXT NOT NULL,
	"shortDescription" TEXT NOT NULL,
	"longDescription" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	"category" TEXT NOT NULL,
	"inventoryQuantity" integer NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "orderDetails_pk" PRIMARY KEY ("orderDetailsId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "shoppingCart" ADD CONSTRAINT "shoppingCart_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");

ALTER TABLE "shoppingCartItems" ADD CONSTRAINT "shoppingCartItems_fk0" FOREIGN KEY ("shoppingCartId") REFERENCES "shoppingCart"("shoppingCartId");
ALTER TABLE "shoppingCartItems" ADD CONSTRAINT "shoppingCartItems_fk1" FOREIGN KEY ("productId") REFERENCES "product"("productId");

ALTER TABLE "order" ADD CONSTRAINT "order_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");

ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_fk0" FOREIGN KEY ("orderId") REFERENCES "order"("orderId");
ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_fk1" FOREIGN KEY ("productId") REFERENCES "product"("productId");
