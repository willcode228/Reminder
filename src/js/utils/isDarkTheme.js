export const isDarkTheme = () => {
    let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return matched ? true : false;
}