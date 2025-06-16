<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CustomerController extends Controller
{
    public function index(Request $request) {
        $limit = $request->input('pagination_limit', 10);
        $query = Customer::with(['address' , 'transactions']);
        $customers = $query->paginate($limit)->through(fn ($customer) => [
            'id' => $customer->id,
            'name' => $customer->first_name . ' ' . $customer->last_name,
            'first_name' => $customer->first_name,
            'last_name' => $customer->last_name,
            'phone' => $customer->phone,
            'email' => $customer->email,
            'address_country' => $customer->address->country,
            'address_city' => $customer->address->city,
            'address_one' => $customer->address->address_line_one,
            'address_two' => $customer->address->address_line_two,
            'address_postal' => $customer->address->postal_code,
            'address_province' => $customer->address->province,
        ]);
        return Inertia::render('admin/customer/index', ['customers' => $customers]);
    }

    public function create(){
        return Inertia::render('admin/customer/create');
    }
    public function store(Request $request){

    $validatedAddress = $request->validate([
        'postal_code'       => 'nullable|string|max:20',
        'address_line_one'  => 'required|string|max:255',
        'address_line_two'  => 'nullable|string|max:255',
        'city'              => 'required|string|max:100',
        'province'          => 'required|string|max:100',
        'country'           => 'required|string|max:100',
    ]);

    $addressId = Address::insertGetId($validatedAddress);

    $validatedCustomer = $request->validate([
        'first_name'        => 'required|string|max:255',
        'last_name'         => 'required|string|max:255',
        'email'             => 'required|email|unique:customers,email',
        'phone'             => 'nullable|string|max:20',
    ]);
    $validatedCustomer['address_id'] = $addressId;

    Customer::insert($validatedCustomer);

       return redirect()->route('customer.index')->with('success', 'Customer added successfully.');
    }
}