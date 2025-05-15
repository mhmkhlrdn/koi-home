<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fish Report - Koi Home</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            font-size: 10pt;
            margin: 20px;
        }

        h4, h5 {
            margin: 0;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h4 {
            font-weight: bold;
        }

        .header a {
            font-size: 10pt;
            color: #555;
            text-decoration: none;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        table thead {
            background-color: #f8f9fa;
        }

        table th, table td {
            border: 1px solid #dee2e6;
            padding: 6px 8px;
            text-align: left;
        }

        table th {
            font-weight: 600;
        }

        .footer {
            margin-top: 30px;
            text-align: right;
            font-size: 9pt;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="header">
        <h4>Fish Report</h4>
        <h5>Koi Management System</h5>
        <a target="_blank" href="https://koi-home.test">https://koi-home.test</a>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Code</th>
                <th>Variety</th>
                <th>Bloodline</th>
                <th>Pool</th>
                <th>Owner</th>
            </tr>
        </thead>
        <tbody>
            @php $i = 1; @endphp
            @foreach($fish as $p)
                <tr>
                    <td>{{ $i++ }}</td>
                    <td>{{ $p->code }}</td>
                    <td>{{ $p->variety->name }}</td>
                    <td>{{ $p->bloodline->name }}</td>
                    <td>{{ $p->pool->name }}</td>
                    <td>{{ $p->user->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Generated on {{ \Carbon\Carbon::now()->format('d M Y, H:i') }}
    </div>
</body>
</html>
