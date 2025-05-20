<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'filePath'
    ];

    public function projects()
    {
        return $this->belongsTo(Project::class);
    }
}
