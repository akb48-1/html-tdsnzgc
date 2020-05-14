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
            if (page.path === path) cachePage.splice(index, 1)
        });
    });
}

export function updateTitle(title, path) {
    var index = cachePage.indexOf(currentPage);

    var currentPage = cachePage.find(item => item.path === path);
    
    currentPage.meta.title = title;
    
    cachePage.splice(index, 1, currentPage)
}