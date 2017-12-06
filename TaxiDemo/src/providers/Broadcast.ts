import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface BroadcastEvent {
    key: any;
    dataSnap?: any;
}

export class Broadcaster {
    private _eventBus: Subject<BroadcastEvent>;

    constructor() {
        this._eventBus = new Subject<BroadcastEvent>();
    }

    broadcast(key: any, dataSnap?: any) {
        this._eventBus.next({ key, dataSnap });
    }

    on<T>(key: any): Observable<T> {
        return this._eventBus.asObservable()
            .filter(event => event.key === key)
            .map(event => <T>event.dataSnap);
    }
}
