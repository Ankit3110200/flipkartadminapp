const linearcategorylist = (categories, options = []) => {
    for (let category of categories) {
        options.push({
            value: category._id,
             name: category.name, 
             parentid: category.parentid,
             type:category.type
        })
        if (category.childern.length > 0) {
            linearcategorylist(category.childern, options)
        }
    }
    return options
}

export default linearcategorylist