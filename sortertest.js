var Tstatus = [{ID: 12, Distance: 23}, {ID: 58, Distance: 2}, {ID: 28, Distance: 45},{ID: 18, Distance: 10}];

Tstatus.sort(sortFunction);

function sortFunction(a, b) {
    if (a.Distance === b.Distance) {
        return 0;
    }
    else {
        return (a.Distance < b.Distance) ? -1 : 1;
    }
}
