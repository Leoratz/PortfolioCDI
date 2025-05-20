<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'last_name',
        'first_name',
        'github',
    ];

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
}
