import config from '@/config';

export const cachePage = [];

export function clearCachePage() {
    cachePage.splice(0, cachePage.length);
}

export function addCachePage(page) {
    cachePage.push(page);
}

export function removeCachePage(pathList) {
    // const newCachePage = cachePage.filter(page => !pathList.includes(page.path) || page.path == config.homePage.path);
    pathList.forEach(path => {
        cachePage.forEach((page, index) => {
            if(page.path === path) cachePage.splice(index, 1)
        });
    });
}