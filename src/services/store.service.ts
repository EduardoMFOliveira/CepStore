import { AppDataSource } from "../database/data-source";
import { Store } from "../database/entities/Store";
import { calculateDistance } from "./distance";

export async function findNearbyStores(userLat: number, userLon: number, radius: number) {
    const storeRepository = AppDataSource.getRepository(Store);
    const stores = await storeRepository.find();

    return stores
        .map(store => ({
            ...store,
            distance: calculateDistance(userLat, userLon, store.latitude, store.longitude)
        }))
        .filter(store => store.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
}