class ficha{
    constructor(lado1, lado2){
        this.lado1 = lado1
        this.lado2 = lado2
    }

    getLado1(){
        return this.lado1
    }

    getLado2(){
        return this.lado2
    }

    setLado1(lado1){
        this.lado1 = lado1
    }

    setLado2(lado2){
        this.lado2 = lado2
    }
    
    getCosto(){
        if(this.lado1 == 0 && this.lado2 == 0){
            return 50
        }else{   
            return this.lado1 + this.lado2
        }
    }

}