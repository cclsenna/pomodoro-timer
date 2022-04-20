 const sessionInfo={
    _sessionType: 'work',
    _session: 0,
    _counter: 1,
    _work:'25',
    _short:'5',
    _long:'10',
    get counter(){  
        return this._counter;
    },
    get session(){
        return this._session;
    },
    get sessionType(){
        return this._sessionType;

    },
    get work(){
        return this._work;

    },
    get short(){
        return this._short; 

    },
    get long(){
        return this._long;

    },
    set session(value){
        this._session=value;
    },
    set work(value){
        this._work=value;

    },
    set short(value){
        this._short=value;

    },
    set long(value){
        this._long=value;

    },
    set counter(value){
        this._counter=value;
    },

    stopSession(){
        this._sessionType='work';
        this._session=0;
        this._counter=1;
        return;

    },


    
    updateSession(){
        
        if(this._sessionType==='work'){
            this._session+=1;
            this._counter+=1;

            if(this.session>3){
                this._sessionType='long';
                return;
            }
            
            this._sessionType='short';
            return;                

        }

        else if(this._sessionType==='long'){
            this._sessionType='work';
            this._session=1;
            return;
                           
        }
        
            this._sessionType='work';

            return;
        
    }
}

export default sessionInfo;