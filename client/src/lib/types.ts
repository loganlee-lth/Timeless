export type Page = {
  name: string;
  to: string;
};

export type Navigation = {
  pages: Page[];
};

export type FooterNavigation = {
  shop: Page[];
  connect: Page[];
};

export type Collection = {
  name: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
};
