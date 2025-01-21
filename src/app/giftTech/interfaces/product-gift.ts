export interface ProductGift
{
  id          :   string;
  name        :   string;
  image       :   string;
  description :   string;
  given       :   boolean;
  claimed     :   boolean;
  category    :   Category;
  condition   :   Condition;

}



export enum Category
{
  Phones        = 'Phones',
  Videogames    = 'Videogames',
  Laptops       = 'Laptops',
  Accessories   = 'Accessories',
  Tablets       = 'Tablets',
  Cameras       = 'Cameras',
  Smartwatches  = 'Smartwatches',
  Audio         = 'Audio',
}

export enum Condition
{
  New           = 'New',
  Used          = 'Used',
  Refurbished   = 'Refurbished',
  Broken        = 'Broken',
  LikeNew       = 'Like New',
}

