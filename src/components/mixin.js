export default {
    methods: {
        currentDate(){
            var today = new Date();
            var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
            return date;
        },
        getNextId(items, reverseOrder = false){
            const index = !reverseOrder ? items.length-1 : 0;
            return items.length ? items[index].id + 1 : 0;
        }
    }
}
