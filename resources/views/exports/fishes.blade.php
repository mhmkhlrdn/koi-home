<table>
    <thead>
        <tr >
            <th style="border: solid black;" align="center" >ID</th>
            <th style="border: solid black;">Name</th>
            <th style="border: solid black;" align="center">Variety</th>
            <th style="border: solid black;" align="center">Bloodline</th>
            <th style="border: solid black;" align="center">Pool</th>
            <th style="border: solid black;" align="center">Owner</th>
            <th style="border: solid black;" align="center">Created At</th>
        </tr>
    </thead>
    <tbody>
        @foreach($fish as $f)
        <tr>
            <td style="border: solid black;" >{{ $f->id }}</td>
            <td style="border: solid black;">{{ $f->code }}</td>
            <td style="border: solid black;">{{ $f->variety->name ?? 'N/A' }}</td>
            <td style="border: solid black;">{{ $f->bloodline->name ?? 'N/A' }}</td>
            <td style="border: solid black;">{{ $f->pool->name ?? 'N/A' }}</td>
            <td style="border: solid black;">{{ $f->user->name ?? 'N/A' }}</td>
            <td style="border: solid black;">{{ $f->created_at }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
