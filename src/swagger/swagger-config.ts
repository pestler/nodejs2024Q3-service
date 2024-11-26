import { DocumentBuilder } from '@nestjs/swagger';

export const docsPath = 'doc';

export const appName = 'Home Library Service';

export const appDescription =
  'The Home Library Service allows users to manage data about Artists, Tracks, and Albums by performing CRUD operations (Create, Read, Update, Delete) and adding them to their Favorites in a personalized home library.';

export const docsConfig = new DocumentBuilder()
  .setTitle(appName)
  .setDescription(appDescription)
  .setVersion('0.1')
  .build();
