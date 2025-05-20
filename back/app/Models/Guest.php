<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    protected $fillable = [
        'last_name',
        'first_name',
        'email',
        'details',
        'status'
    ];

}
