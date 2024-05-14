/*
  Warnings:

  - A unique constraint covering the columns `[userId,restaurantId]` on the table `UserFavoriteRestaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserFavoriteRestaurant_userId_restaurantId_key" ON "UserFavoriteRestaurant"("userId", "restaurantId");
