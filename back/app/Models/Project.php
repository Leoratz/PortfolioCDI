<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'details',
        'year',
        'stack',
        'link',
    ];

    public function students()
    {
        return $this->belongsToMany(Student::class);
    }

    public function medias()
    {
        return $this->hasMany(Media::class);
    }
}
