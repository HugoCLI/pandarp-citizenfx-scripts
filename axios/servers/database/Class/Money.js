
    class Money {

        constructor() 
        {
            this.cash = 0;
            this.bank = 0;
        }

        // set: initialisation
        set(type, value) {
            if (type == "cash" || type == "bank")
                this[type] = value; 
        }

        add(type, value) {
            if (type == "cash" || type == "bank")
                this[type] += value;
        }

        get(type) {
            if (type == "cash" || type == "bank")
                return this[type] 
        }
            
        remove(type, value) {
            if (type == "cash" || type == "bank")
            {
                if (this[type] >= value)
                {
                    this[type] -= value;
                    return true;
                }
            }    
            return false;
        }
        
    }

